import { Component, Input, Output, EventEmitter } from "@angular/core";
import { MaterialModule } from "../../../core/material/material.module";
import { RouterModule, RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: "side-nav",
  standalone: true,
  styleUrls: ["./side-nav.component.scss"],
  templateUrl: './side-nav.component.html',
  imports: [CommonModule, RouterOutlet, MaterialModule, RouterModule]
})
export class SidenavComponent {
  @Input() isExpanded: boolean | undefined;
  @Output() toggleMenu = new EventEmitter();

  public routeLinks = [
    { link: "dashboard", name: "Dashboard", icon: "dashboard" },
    { link: "user", name: "User",   icon: "person" },
  ];
}