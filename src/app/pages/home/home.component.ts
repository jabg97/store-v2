import {
  Component,
  OnInit,
  ViewChild
} from "@angular/core";
import {
  SideNavService
} from "../../services/side-nav.service";
import {
  onSideNavChange,
  onMainContentChange
} from "../../components/animation/nav-animation";
import {
  ScreenBreakpointService
} from "../../services/breakpoint.service";
import {
  MatSidenav
} from "@angular/material";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  animations: [onSideNavChange, onMainContentChange]
})
export class HomeComponent implements OnInit {
  constructor(
    public navService: SideNavService,
    public BP: ScreenBreakpointService
  ) {}

  ngOnInit() {}
}
