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
import { EducationComponent } from './education/education.component';
import { CoursesComponent } from './education/course1/courses.component';
import { QuizComponent } from './education/quiz/quiz.component';

import { ChatComponent } from '../chat/chat.component';
import { NewsComponentComponent } from '../news-component/news-component.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';

import { Quiz2Component } from './education/quiz2/quiz2.component';
import { ResultatComponent } from './education/resultat/resultat.component';







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
      path: 'chatbot', component: ChatbotComponent,
    },
    {
      path: 'post', component: PostComponent,
    },
    {
      path: 'comment', component: CommentComponent,
    },
    {

      path: 'education', component: EducationComponent,
    },
    {
      path: 'course1', component: CoursesComponent
    },
    {
      path: 'Quiz', component: QuizComponent
    },
    { path: 'chat', component: ChatComponent },
    { path: 'news', component: NewsComponentComponent },
    {path : 'transaction-history', component : TransactionHistoryComponent}
,
    {
      path:'Quiz2',component:Quiz2Component
    },
    {
      path:'result',component:ResultatComponent
    }





  ]
}];

@NgModule({
  imports: [RouterModule.forChild(clientroutes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
