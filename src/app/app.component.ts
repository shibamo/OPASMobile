import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TranslateService } from 'ng2-translate/ng2-translate';

import { Page1 } from '../pages/page1/page1';
//import { Page2 } from '../pages/page2/page2';
import { LoginPage } from '../pages/login/login';
import { SysSettingPage } from '../pages/sys-setting/sys-setting';
import { InternalAddressbookPage } from '../pages/internal-addressbook/internal-addressbook';
import { FlowtasksPage } from '../pages/flowtasks/flowtasks';

import { UserService } from '../providers/userService';
import { FlowTaskService } from '../providers/flowtaskService';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Page1;

  pages: Array<{title: string, component: any}>;

  loginPage: any = {
    title: 'Login to OPAS',  component:LoginPage
  };
  flowtasksPage: any = {
    title: 'Flow Tasks',  component:FlowtasksPage
  };
  sysSettingPage: any = {
    title: 'Flow Tasks',  component:SysSettingPage
  };
  internalAddressbookPage: any = {
    title: 'Addess Book',  component:InternalAddressbookPage
  };      

  translator: TranslateService;
  currentLanguage: string;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,  
    translate: TranslateService,
    public userService: UserService,
    public flowTaskService: FlowTaskService) 
  {
    this.initializeApp();

    // Set the default language for translation strings, and the current language.
    translate.setDefaultLang('cn');
    translate.use('cn');
    this.translator = translate;
    this.currentLanguage = 'cn';

    // used for an example of ngFor and navigation
    this.pages = [
      // { title: 'Page One', component: Page1 },
      // { title: 'Page Two', component: Page2 }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.userService.getStoredState();
      // this.flowTaskService.getTasks(true);

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  toggleLanguage(){
    this.currentLanguage = (this.currentLanguage== 'en'?  'cn' : 'en');
    this.translator.use(this.currentLanguage);
  
  }

  logout(){
    this.userService.logout();
  }

  callSupport(){

  }

  getTasks(){
    this.flowTaskService.getTasks(true);
  }
}
