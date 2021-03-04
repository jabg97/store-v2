import {
  Injectable
} from "@angular/core";

import {
  ApiService
} from "./api.service";

@Injectable({
  providedIn: "root"
})
export class SideNavService {
  private _sideNavOpen = false;
  private _isWatch = false;
  public details = [];
  constructor(private _api: ApiService,) {
if(this._api.isLoggedIn){
    this._api.cart( this._api.getUser).subscribe(data => {
      console.log(data);
      if (data.status == 200) {
        this.details = data.details;
      } 

    });
  }
  }

  get isOpen(): boolean {
    return this._sideNavOpen;
  }

  get isWatch(): boolean {
    return this._isWatch;
  }

  setWatch(value: boolean): void {
    this._isWatch = value;
  }

  closeNav() {
    this._sideNavOpen = false;
  }

  toggle() {
    this._sideNavOpen = !this._sideNavOpen;
  }
}
