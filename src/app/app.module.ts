import { NgModule, ErrorHandler } from '@angular/core';
import { Http } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';

import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { LoginPage } from '../pages/login/login';
import { FlowtasksPage } from '../pages/flowtasks/flowtasks';
import { FlowtaskPrPage } from '../pages/flowtask-pr/flowtask-pr';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { UserService } from '../providers/userService';
import { Api } from '../providers/api';
import { FlowTaskService} from '../providers/flowtaskService';
import { FlowActionService} from '../providers/flowActionService';
import { AttachService } from '../providers/attachService';
import { PurchaseReqService } from '../providers/purchaseReqService';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    LoginPage,
    FlowtasksPage,
    FlowtaskPrPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp,{
      menuType: 'push',
      platforms: {
        ios: {
          menuType: 'reveal',
        }
      }
    }),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    LoginPage,
    FlowtasksPage,
    FlowtaskPrPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserService,
    Api,
    FlowTaskService,
    FlowActionService,
    AttachService,
    PurchaseReqService,
  ]
})
export class AppModule {}
