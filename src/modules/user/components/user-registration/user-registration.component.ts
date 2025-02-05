import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserQueries } from '../../services/user.queries';
import { UserService } from '../../services/user.service';

class UserRegistrationFormModel {
  username = "";
  password = "";
  confirmPassword = "";
}

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.less']
})
export class UserRegistrationComponent implements OnInit {
  @ViewChild("f")
  form: NgForm;

  model = new UserRegistrationFormModel();

  constructor(
    private router: Router,
    private userService: UserService,
    private userQueries: UserQueries,
    private nzMessageService: NzMessageService
  ) { }


  passwordErrorMessage: "kkzkzk"
  ngOnInit(): void {
  }

  async submit() {
    // console.log(this.model)
    // TODO  Vérifier que la confirmation de mot de passe correspond au mot de passe
    if (this.model.password === "" || this.model.confirmPassword === "") {
      this.nzMessageService.error("Mot de passe incorrect")
      return;
    }
    if (this.form.form.invalid || this.model.password !== this.model.confirmPassword) {
      // dialog("zzzzz")
      this.nzMessageService.error("Les mots de passe de correspondent pas")
      return;
    } else {
      if (await this.userQueries.exists(this.model.username)) {
        this.nzMessageService.error("Nom d'utilisateur déjà utilisé")
        return;
      } else {
        // TODO Enregistrer l'utilisateur via le UserService
        this.userService.register(this.model.username, this.model.password)
        this.goToLogin();
      }
    }

  }

  goToLogin() {
    // TODO rediriger l'utilisateur sur "/splash/login"
    this.router.navigate(['/splash/login'])
  }
}
