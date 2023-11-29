import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';

import { ConfigProfileComponent } from './config-profile/config-profile.component';
import { IdeeComponent } from './idee/idee.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { DataUserGuard } from '../shared/guard/Data-User.guard';
import { OrderBookComponent } from '../market/order-book/order-book.component';
import { DepthChartComponent } from '../market/depth-chart/depth-chart.component';
import { PortefeuilleComponent } from './portefeuille/portefeuille.component';
import { DepositComponent } from '../deposit/deposit.component';
import { WalletComponent } from '../wallet/wallet.component';
import { ChatbotComponent } from '../shared/chatbot/chatbot.component';
import { PostComponent } from '../post/post.component';
import { CommentComponent } from '../comment/comment.component';



export const clientroutes: Routes = [{
  path: '', component: ClientComponent, canActivate: [DataUserGuard], children: [
    {
      path: 'config', component: ConfigProfileComponent,
    },
    {
      path: 'idee', component: IdeeComponent,
    },
    {
      path: 'reclamation', component: ReclamationComponent,
    }, {
      path: 'orderBook', component: OrderBookComponent,
    },
    {
      path: 'depthChart', component: DepthChartComponent
    },
    { path: 'portefeuille', component: PortefeuilleComponent },
    {
      path: 'deposit', component: DepositComponent,
    },
    {
      path: 'wallet', component: WalletComponent,
    },
    {
      path:'chatbot', component:ChatbotComponent,
    },
    {
      path:'post', component:PostComponent,
    },
    {
      path:'comment', component:CommentComponent,
    }


  ]
}];

@NgModule({
  imports: [RouterModule.forChild(clientroutes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
