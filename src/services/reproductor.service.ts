import { Injectable } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio';

@Injectable()
export class ReproductorService {

    private volumen: number;
    private canciones: Array<any>;
    private cancion: any;

    constructor(
        private nativeAudio: NativeAudio
    ) {
        this.volumen = 1; //maximo volumen desde el inicio
        this.canciones = [ //lista de canciones por default
            {
                id: "cancion01",
                portada: "caratula01.jpg",
                mp3: "assets/mp3/Destruction.mp3",
                titulo: "Destruction",
                artista: "Joywave"
            },
            {
                id: "cancion02",
                portada: "caratula02.jpg",
                mp3: "assets/mp3/Creature-Comfort.mp3",
                titulo: "Creature Comfort",
                artista: "Arcade Fire"
            },
            {
                id: "cancion03",
                portada: "caratula03.jpg",
                mp3: "assets/mp3/Devils-Dance.mp3",
                titulo: "Devils Dance",
                artista: "Metallica"
            }
        ];
    }

    public obtenerCanciones(): Array<any> {
        return this.canciones;
    }

    public obtenerVolumen(): number {
        return this.volumen;
    }

    public async prepararCanciones() {
        this.canciones.forEach(cancion => { //cargamos cada cancion al plugin
            this.nativeAudio.preloadComplex(cancion.id, cancion.mp3, this.volumen, 1, 0);
        });
    }

    public async reproducirCancion(cancion?: any) {
        try {
            if (this.cancion) { //validar si hay que detener reproduccion actual
                this.nativeAudio.stop(this.cancion.id);
            }
            if (cancion) { //verificar si reproducimos una cancion nueva
                this.cancion = cancion;
            }
            await this.nativeAudio.play(this.cancion.id); //reproducir la cancion
            await this.nativeAudio.setVolumeForComplexAsset(this.cancion.id, this.volumen); //ajustar el volumen
        } catch (ex) {
            console.log(JSON.stringify(ex));
        }
    }

    public async detenerCancion() {
        await this.nativeAudio.stop(this.cancion.id);//stop!
    }

    public async ajustarVolumen(volumen: number) {
        this.volumen = volumen;//guardamos el volumen
        await this.nativeAudio.setVolumeForComplexAsset(this.cancion.id, volumen); //ajustamos el volumen
    }
}
