import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Módulos
import { SharedModule } from '../shared/shared.module';
import { ChartsModule } from 'ng2-charts';
import { PipesModule } from '../pipes/pipes.module';

// Rutas
import { PAGES_ROUTES } from './pages.routes';

// Componentes
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalComponent } from './hospital/hospital.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';

// Temporal
import { ContadorComponent } from '../components/contador/contador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        Graficas1Component,
        ProgressComponent,

        // Temporal
        ContadorComponent,
        GraficoDonaComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsuariosComponent,
        HospitalComponent,
        ModalUploadComponent,
        MedicosComponent,
        MedicoComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        SharedModule,
        ChartsModule,
        PipesModule,
        PAGES_ROUTES
    ],
    exports: [
        PagesComponent,
        DashboardComponent,
        Graficas1Component,
        ProgressComponent
    ]
})
export class PagesModule {}
