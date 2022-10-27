import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from "ng-zorro-antd/message";
import { AuthenticationService } from '../../services/authentication.service';

class LoginFormModel {
  username = "";
  password = "";
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  @ViewChild(NgForm, { static: false })
  ngForm: NgForm;

  model = new LoginFormModel();

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private nzMessageService: NzMessageService
  ) { }

  ngOnInit(): void {
  }

  goToRegistration() {
    // TODO naviguer vers "/splash/register"
    console.log(this.router.config)
    this.router.navigate(["/splash/register"])
  }

  submit() {
    this.login();
  }

  async login() {
    // console.log(this.model)
    if (this.ngForm.form.invalid) {
      this.nzMessageService.error("Formulaire incomplet");
      return;
    }

    try {
      // TODO vérifier le résultat de l'authentification. Rediriger sur "/" en cas de succès ou afficher une erreur en cas d'échec
      let result = await this.authService.authenticate(this.model.username, this.model.password);
      // console.log(result.success)
      if(result.success) {
        this.router.navigate(["/"])
      } else {
        this.nzMessageService.error("Nom d'utilisateur ou mot de passe incorrect(s)");
      }
    } catch (e) {
      this.nzMessageService.error("Une erreur est survenue. Veuillez réessayer plus tard");
    }
  }
}
