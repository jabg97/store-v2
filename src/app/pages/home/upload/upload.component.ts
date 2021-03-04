import {
  Component,
  OnInit
} from "@angular/core";
import {
  Router,ActivatedRoute
} from "@angular/router";
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import {
  NgForm
} from '@angular/forms';
import {
  NgxSpinnerService
} from "ngx-spinner";
import {
  ApiService
} from "../../../services/api.service";
@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.css"],
})
export class UploadComponent implements OnInit {

  public img: File;
  user: any;
  edit: any;
  id: any;
  user_id: any;
  constructor(
    private _api: ApiService,
    private router: Router,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute) {
    this.user = {};
    this.edit = {};
    this.id = 0;
    this.user_id = 0;
  }

  ImgChange(event) {
    this.img = event.target.files[0];
    var fSExt = new Array('Bytes', 'KB', 'MB', 'GB');
    var fSize = this.img.size;
    var i = 0;
    while (fSize > 900) {
      fSize /= 1024;
      i++;
    }
    document.getElementById("size").innerHTML = (Math.round(fSize * 100) / 100) + ' ' + fSExt[i];
  }

  UploadSubmit(fu: NgForm) {
    const snackBar = this.snackBar;
    const router = this.router;
    if (fu.valid) {
      let formData = new FormData();
      formData.append("id", this.id);
      formData.append("seller_id", this._api.getUser);
      formData.append("reference", fu.value.reference);
      formData.append("unit_value", fu.value.unit_value);
      formData.append("name", fu.value.name);
      formData.append("description", fu.value.description);
      formData.append("img", this.img);
      if (this.img) {
          this.spinner.show();
          this._api.upload(formData).subscribe(data => {
            console.log(data);
            this.spinner.hide();
            if (data.status == 200) {
              router.navigateByUrl('product/' + data.product);
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
          this.snackBar.open('Seleccione una imagen.', '', {
            duration: 2000
          });
        }
    } else {
      this.snackBar.open('Formulario Incompleto.', '', {
        duration: 2000
      });
    }
  }
  UpdateSubmit(fu: NgForm) {
    const snackBar = this.snackBar;
    const router = this.router;
    if (fu.valid) {
      let formData = new FormData();
      formData.append("id", this.id);
      formData.append("seller_id", this._api.getUser);
      formData.append("reference", fu.value.reference);
      formData.append("unit_value", fu.value.unit_value);
      formData.append("name", fu.value.name);
      formData.append("description", fu.value.description);
      formData.append("img", this.img);
 
          this.spinner.show();

          console.log(formData);
          this._api.product_update(formData).subscribe(data => {
            console.log(data);
            this.spinner.hide();
            if (data.status == 200) {
              router.navigateByUrl('product/' + data.product);
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

  ngOnInit() {
    if (!this._api.isLoggedIn) {
      this.router.navigateByUrl('auth')
    }
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get("id");
    this.user_id = this._api.getUser

    const snackBar = this.snackBar;
    const router = this.router;
    if (this.user_id) {
      this.spinner.show();
      this._api.user(this.user_id).subscribe(data => {
        console.log(data);
        this.spinner.hide();
        if (data.status == 200) {
          this.user = data.user;
          if (this.id) {
            this.spinner.show();
            this._api.info(this.id, this._api.getUser).subscribe(data => {
              console.log(data);
              this.spinner.hide();
              if (data.status == 200) {
                this.edit = data.product;
              } else {
                this.router.navigateByUrl('/profile')
                snackBar.open(data.message, '', {
                  duration: 2000
                });
              }
    
            });
          } 
        } else {
          this.router.navigateByUrl('')
          snackBar.open(data.message, '', {
            duration: 2000
          });
        }

      });
    } else {
      this.router.navigateByUrl('')
      snackBar.open("El usuario no existe", '', {
        duration: 2000
      });
    }
  });
  }

}
