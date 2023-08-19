import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Utils } from 'src/app/utils/utils';
import { PagerService } from 'src/app/services/page-service';
import { AccountService } from 'src/app/services/account-service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html'
})

export class UserComponent implements OnInit {

    returnUrl: string = '';
    @Input() id: any = '';

    public pager: any = {};
    pagedItems: any[] = [];
    firstPage = 1;
    itemsByPage = 100;

    constructor(
        private formbuilder: FormBuilder,
        private accountService: AccountService,
        private spinner: NgxSpinnerService,
        private pagerService: PagerService,
        private utils: Utils
    ) {

    }
    ngOnInit() {
        this.filterView()
    }

    redirectUpdate(url: string, id: string) {
        this.utils.navigateTo(url, id);
    }

    redirectTo(url: string) {
        this.utils.navigateTo(url, '')
    }

    filterView() {
        this.spinner.show();
        this.accountService.getAll().subscribe(view => {
            this.pagedItems = view.items;
            this.pager = this.pagerService.getPager(view._total, 1, 1000);
            this.spinner.hide();
        }, error => {
            this.spinner.hide();
            this.utils.showErrorMessage(error, '');
        });
    }

}