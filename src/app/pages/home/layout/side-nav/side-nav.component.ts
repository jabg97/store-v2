import {
  Component,
  OnInit
} from "@angular/core";
import {
  SideNavService
} from "src/app/services/side-nav.service";
import {
  ApiService
} from "../../../../services/api.service";
import {
  MatSnackBar
} from '@angular/material/snack-bar';
@Component({
  selector: "app-side-nav",
  templateUrl: "./side-nav.component.html",
  styleUrls: ["./side-nav.component.css"]
})
export class SideNavComponent implements OnInit {
  is_auth = false;
  constructor(public navService: SideNavService,
    private _api: ApiService,
    private snackBar: MatSnackBar) {}
  ngOnInit() {
    if (this._api.isLoggedIn) {
      this.is_auth = true;
    }
  }

  getTotal(arr){
    return arr.reduce( (sum, item) => sum + (item.unit_value * item.quantity),0 );
  }

  clear(user) {
    let requestData = {
      "user_id": user
    }
    const snackBar = this.snackBar;
    this._api.clear(requestData).subscribe(data => {
      console.log(data);
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

  add_item(id) {
    let requestData = {
      "id": id,
    }
    const snackBar = this.snackBar;
    this._api.add_item(requestData).subscribe(data => {
      console.log(data);
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

  rem_item(id) {
    let requestData = {
      "id": id,
    }
    const snackBar = this.snackBar;
    this._api.rem_item(requestData).subscribe(data => {
      console.log(data);
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

  del_item(id) {
    let requestData = {
      "id": id,
    }
    const snackBar = this.snackBar;
    this._api.del_item(requestData).subscribe(data => {
      console.log(data);
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


}
