import {
  Component,
  OnInit,
  OnDestroy
} from "@angular/core";
import {
  ActivatedRoute,
  Router,
  ParamMap
} from "@angular/router";
import {
  ApiService
} from "../../../services/api.service";
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import {
  SideNavService
} from "src/app/services/side-nav.service";
import {
  NgForm
} from '@angular/forms';
import {
  NgxSpinnerService
} from "ngx-spinner";
@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"]
})
export class ProductComponent implements OnInit, OnDestroy {
  product: any;
  comments: Array < any > ;
  products: Array < any > ;
  more: Array < any > ;
  id: any;
  url: any;
  comments_count: any;
  user: any;
  content: string;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _api: ApiService,
    private snackBar: MatSnackBar,
    public navService: SideNavService,
    private spinner: NgxSpinnerService) {
    this.product = {};
    this.user = {};
    this.id = 0;
    this.comments_count = 0;
    this.comments = [];
    this.products = [];
    this.more = [];
    this.content = "";
  }

  is_auth = false;

  CommentSubmit(fc: NgForm) {
    const snackBar = this.snackBar;
    const router = this.router;
    if (fc.valid) {
      let requestData = new FormData();
      requestData.append("content", fc.value.content);
      requestData.append("product_id", this.product.id);
      requestData.append("user_id", this.user.id);
      this.spinner.show();
      this._api.comment(requestData).subscribe(data => {
        console.log(data);
        this.spinner.hide();
        if (data.status == 200) {
          this.comments_count++;
          this.comments.unshift(data.comment);
          snackBar.open(data.message, '', {
            duration: 2000
          });
        } else {
          snackBar.open(data.message, '', {
            duration: 2000
          });
        }

      });
    } else {
      this.snackBar.open('Formulario Incompleto.', '', {
        duration: 2000
      });
    }
  }


  comment_like(id,i) {
    let requestData = {
      "id": id
    }
    const snackBar = this.snackBar;
    this.spinner.show();
    this._api.comment_like(requestData).subscribe(data => {
      console.log(data);
      this.spinner.hide();
      if (data.status == 200) {
        this.comments[i].likes++;
        snackBar.open(data.message, '', {
          duration: 2000
        });
      } else {
        snackBar.open(data.message, '', {
          duration: 2000
        });
      }

    });
  }

  comment_dislike(id,i) {
    let requestData = {
      "id": id
    }
    const snackBar = this.snackBar;
    this.spinner.show();
    this._api.comment_dislike(requestData).subscribe(data => {
      console.log(data);
      this.spinner.hide();
      if (data.status == 200) {
        this.comments[i].dislikes++;
        snackBar.open(data.message, '', {
          duration: 2000
        });
      } else {
        snackBar.open(data.message, '', {
          duration: 2000
        });
      }

    });
  }
  add(id,user) {
    let requestData = {
      "product_id": id,
      "user_id": user
    }
    const snackBar = this.snackBar;
    this.spinner.show();
    this._api.add(requestData).subscribe(data => {
      console.log(data);
      this.spinner.hide();
      if (data.status == 200) {
        this.navService.details = data.details;
        snackBar.open(data.message, '', {
          duration: 2000
        });
      } else {
        snackBar.open(data.message, '', {
          duration: 2000
        });
      }

    });
  }

  delete(id,i) {
    let requestData = {
      "id": id
    }
    
    const snackBar = this.snackBar;
    this.spinner.show();
    this._api.comment_delete(requestData).subscribe(data => {
      console.log(data);
      this.spinner.hide();
      if (data.status == 200) {
        this.comments.splice(i, 1);
        this.comments_count--;
        snackBar.open(data.message, '', {
          duration: 2000
        });
      } else {
        snackBar.open(data.message, '', {
          duration: 2000
        });
      }

    });
  }

  ngOnInit() {
    if (this._api.isLoggedIn) {
      this.is_auth = true;
    }
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get("id");
      this.url = this._api.getUrl;
      const snackBar = this.snackBar;
      const router = this.router;

      if (this.id) {
        this.spinner.show();
        this._api.info(this.id, this._api.getUser).subscribe(data => {
          console.log(data);
          this.spinner.hide();
          if (data.status == 200) {
            this.product = data.product;
            this.comments = data.comments;
            this.comments_count = data.comments_count;
            this.more = data.more;
            this.products = data.products;
            this.user = data.user;
          } else {
            this.router.navigateByUrl('')
            snackBar.open(data.message, '', {
              duration: 2000
            });
          }

        });
      } else {
        this.router.navigateByUrl('')
        snackBar.open("El producto no existe", '', {
          duration: 2000
        });
      }
    });


  }

  ngOnDestroy() {
    
  }
}
