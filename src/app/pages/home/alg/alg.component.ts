import {
  Component,
  OnInit
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
  SideNavService
} from "src/app/services/side-nav.service";
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import {
  NgxSpinnerService
} from "ngx-spinner";
import {
  NgForm
} from '@angular/forms';

@Component({
  templateUrl: "./alg.component.html",
  styleUrls: ["./alg.component.css"],
  selector: "app-alg"
})
export class AlgComponent implements OnInit {
  unsorted : Array < any > ;
  sorted : Array < any > ;
  result: any;
  title: any;
  is_auth = false;
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    public navService: SideNavService,
    private _api: ApiService,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService) {
      this.result = "";
    this.unsorted = [];
    this.sorted = [];
    this.title = "";
  }
  ExpSubmit(fu: NgForm) {
    const snackBar = this.snackBar;
    const router = this.router;
    if (fu.valid) {
      let formData = new FormData();
      formData.append("x", fu.value.x);
      formData.append("y", fu.value.y);
      this.spinner.show();
      this._api.exp(formData).subscribe(data => {
        console.log(data);
        this.spinner.hide();
        if (data.status == 200) {
          this.result = data.result;
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

  sort() {
      const snackBar = this.snackBar;

        this.spinner.show();
        this._api.sort().subscribe(data => {
          console.log(data);
          this.spinner.hide();
          if (data.status == 200) {
            this.sorted = data.sorted;
            this.unsorted = data.unsorted;
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
            this.title = "Algoritmos";
    
  }
}
