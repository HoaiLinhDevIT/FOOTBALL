import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegisterService } from '@auth/services/register.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  private activatedToken!: string;
  public constructor(
    private route: ActivatedRoute,
    private registerService: RegisterService
    ) {}

  public ngOnInit(): void {
    if(this.route.snapshot.params['userId']) {
      this.activatedToken = this.route.snapshot.params['userId'];
    }
    this.actiatedEmail();
  }

  private actiatedEmail(): void {
    this.registerService.activatedEmail({activatedToken: this.activatedToken})
      .subscribe((res) => {
        //console.log(res);
      });
  }

}
