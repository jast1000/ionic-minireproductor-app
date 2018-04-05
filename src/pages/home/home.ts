import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { ReproductorService } from '../../services/reproductor.service';
import { ReproductorPage } from '../reproductor/reproductor';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  private canciones: Array<any>;

  constructor(
    public navCtrl: NavController,
    private platform: Platform,
    private reproductorSrv: ReproductorService
  ) {
    this.canciones = new Array<any>();
  }

  public ngOnInit(): void {
    this.canciones = this.reproductorSrv.obtenerCanciones();//obtener lista de canciones para visualizarlas
    this.platform.ready().then(() => {//mandar a ejecutar despues de que termine de cargar "bien" la app
      this.reproductorSrv.prepararCanciones(); //Cargar canciones al plugin
    });
  }

  public reproducir(cancion: any): void {
    this.reproductorSrv.reproducirCancion(cancion); //reproducir cancion que llego a la pantalla
    this.navCtrl.push(ReproductorPage, { cancion: cancion }); //mandar la cancion a la pantalla de reproduccion
  }

}
