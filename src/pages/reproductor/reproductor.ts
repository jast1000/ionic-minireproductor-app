import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ReproductorService } from '../../services/reproductor.service';

@Component({
    selector: "reproductor",
    templateUrl: 'reproductor.html'
})
export class ReproductorPage implements OnInit {

    private detenido: boolean; //bandara para saber si detuvo la cancion
    private volumen: number; //para dibujar el volumen
    private canciones: Array<any>;
    private cancionActual: any;

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private reproductorSrv: ReproductorService
    ) {
        this.volumen = 10;//se remplaza por el del servicio
        this.detenido = false;
        this.canciones = new Array<any>();
    }

    public ngOnInit(): void {
        this.volumen = this.reproductorSrv.obtenerVolumen() * 10; //ajustamos para que sea de 0 a 10
        this.canciones = this.reproductorSrv.obtenerCanciones(); //obtener lista de  canciones
        this.cancionActual = this.navParams.get("cancion");//obtener la cancion que se envio de la pantalla anterior
    }

    private reproducir(): void {
        this.detenido = false; //al mandar a reproducir marcamos como "des-detenido!"
        this.reproductorSrv.reproducirCancion(); //reproducir cancion (la que ya estaba asignada)
    }

    private detener(): void {
        this.detenido = true; //marcar como detenido
        this.reproductorSrv.detenerCancion(); //mandar al servicio a detener la cancion
    }

    private reproducirAnterior(): void {
        let index = this.canciones.indexOf(this.cancionActual); //obtener indice de cancion
        if (index == 0) return; //validar que no sea la primera!
        this.cancionActual = this.canciones[index - 1]; //obtenemos la cancion anterior
        this.detenido = false;
        this.reproductorSrv.reproducirCancion(this.cancionActual); //la mandamos a reproducir
    }

    private reproducirSiguiente(): void {
        let index = this.canciones.indexOf(this.cancionActual); //obtener indice de cancion
        if (index == (this.canciones.length - 1)) return; //validar que no sea la ultima!
        this.cancionActual = this.canciones[index + 1];
        this.detenido = false;
        this.reproductorSrv.reproducirCancion(this.cancionActual);
    }

    private ajustarVolumen(volumen: number): void {
        this.reproductorSrv.ajustarVolumen(volumen / 10); //por cada movimiento se manda a ajustar el volumen
    }

    private esPrimeraCancion(): boolean {
        return this.cancionActual.id == this.canciones[0].id; //validar si es la primera cancion
    }

    private esUltimaCancion(): boolean {
        return this.cancionActual.id == this.canciones[this.canciones.length - 1].id; //validar si es la ultima cancion
    }
}
