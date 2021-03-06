import {fecha_amd} from './funcionesfecha.js'
class Doctor { 

    constructor(reset = false) {
        this.fila = 2.5

        this.imprimeInformacion = (margen,id,etiqueta="",doc,esTextArea=false,maxLineWidth=0,esfecha=false) => {
            const el = document.querySelector(`#${id}`);
            if (el.value==""){
                return false;
            } else {
                if(esTextArea){
                    var textLines = doc.splitTextToSize(el.value, maxLineWidth);
                    var numeroDeLineas = textLines.length;
                    doc.setFontType('bold');
                    doc.text(margen,this.fila,etiqueta);this.fila += .5;
                    doc.setFontType('default');
                    doc.text(margen, this.fila,textLines);
                    this.fila += (.5 * numeroDeLineas);
                } else {
                    doc.text(margen,this.fila,etiqueta);
                    doc.setFontType('bold');
                    if(esfecha){
                        doc.text(3.3,this.fila,fecha_amd(el.value));
                    } else {
                        doc.text(3.3,this.fila,el.value);
                    }
                    doc.setFontType('default');
                }
                return true;
            }
        }

        this.negrita = (doc,margen,fila,elemento) => {
            doc.setFontType('bold');
            doc.text(margen,fila,document.getElementById(elemento).value),
            doc.setFontType('default');
        }

        this.setEjemplo = () => {
            document.getElementById("nombre").value = 'Uziel Clemente Cruz';
            document.getElementById("edad").value = '26';
            document.getElementById("ta").value = '130/90';
            document.getElementById("fc").value = '89';
            document.getElementById("temp").value = '36';
            document.getElementById("peso").value = '90';
            document.getElementById("talla").value = '170';
            document.getElementById("imc").value = '31.14';
            document.getElementById("dx").value = `Se parti?? la maceta. \r\nDice que estaba sobre un columpio probando su resistencia \r\nPero la estructura no soport??, se call?? y le call?? en la cabeza \r\ncomo no tra??a casco de seguridad le ocasion?? una herida en la cabeza.`;
            document.getElementById("rp").value = `Diclofenaco 100mg tabletas. \r\nIngerir una tableta despu??s del desayuno y cena por 5 d??as. \r\nCuraci??n ma??ana entre 15 y 19hrs. \r\nRetiro de puntos en una semana.`;
        }

        this.fnCalculaImc = (peso, talla) => {
            let alturaMetro, alturaAlCuadrado, div, imc = 0.00;
            if (peso != "" && talla != "") {
                alturaMetro = talla / 100;
                alturaAlCuadrado = Math.pow(alturaMetro, 2);
                div = peso / alturaAlCuadrado;
                imc = ((div * 100) / 100).toFixed(2);
                document.querySelector("#imc").value = imc;
            } else {
                document.querySelector("#imc").value = "";
            }
        }

        if (reset) {

            document.querySelector("#peso").addEventListener("change", () => {
                this.fnCalculaImc(
                    document.querySelector("#peso").value,
                    document.querySelector("#talla").value
                );
            })

            document.querySelector("#talla").addEventListener("change", () => {
                this.fnCalculaImc(
                    document.querySelector("#peso").value,
                    document.querySelector("#talla").value
                );
            })

            // this.setEjemplo();

            document.querySelector("#btnImprimirReceta").addEventListener("click", () => {
                if (document.querySelector("#nombre").value == "") return;
                new Doctor().fnCreaRecetaPdf();
            })

            document.querySelector("#btnImprimirCertificado").addEventListener("click", () => {
                if (document.querySelector("#txtTextoCertificado").value == "") return;
                new Doctor().fnCreaCertificadoPdf();
            })

        }
    }

    fnCreaRecetaPdf() {
        let 
        pageWidth = 14.0,
        margen = 1.5,
        maxLineWidth = pageWidth - margen * 2,
        fontsizenormal = 12,
        fontsizesmall = 8,
        ptsPerInch = 28.34,
        lineheight = 1,
        valNombre = document.querySelector("#nombre").value;

        let doc = new jsPDF({
            orientation: "portrait",
            unit: "cm",
            format: [21.6,14.0],
            lineHeight: lineheight
        });

        var imgEncabezado = new Image();
        imgEncabezado.onload = function(){
            var dataURI = new Doctor().getBase64Image(imgEncabezado);
            return dataURI;
           }
        imgEncabezado.src = "../img/EncabezadoNuevoReceta.jpg";

        var imgPie = new Image()
        imgPie.onload = function(){
            var dataURI = new Doctor().getBase64Image(imgPie);
            return dataURI;
           }
        imgPie.src = "../img/PieDePaginaNuevoReceta.jpg";

        doc.addImage(imgEncabezado.onload(), 'JPEG', .63, .66, 12.7, 1.93)
        this.fila += 1;

        if (valNombre!="."){

            doc.setFontSize(fontsizenormal);
            if(this.imprimeInformacion(margen,"fecha","Fecha:",doc,false,0,true)){
                this.fila +=.5;
            }
            if(this.imprimeInformacion(margen,"nombre","Nombre:",doc)){
                this.fila +=.5;
            }
            doc.setFontSize(fontsizesmall);
            if (this.imprimeInformacion(margen,"edad","Edad:",doc)){
                this.fila +=.3;
            }
            if(this.imprimeInformacion(margen,"ta","T.A:",doc)){
                this.fila +=.3;
            }
            if(this.imprimeInformacion(margen,"fc","F.C:",doc)){
                this.fila +=.3;
            }
            if(this.imprimeInformacion(margen,"temp","Temp:",doc)){
                this.fila +=.3;
            }
            if(this.imprimeInformacion(margen,"peso","Peso:",doc)){
                this.fila +=.3;
            }
            if(this.imprimeInformacion(margen,"talla","Talla:",doc)){
                this.fila +=.3;
            }
            if(this.imprimeInformacion(margen,"imc","IMC:",doc)){
                this.fila +=.3;
            }
            this.fila += .6;
            doc.setFontSize(fontsizenormal);
            if(this.imprimeInformacion(margen,"dx","DX:",doc,true,maxLineWidth)){
                this.fila += .3;
            }
            if(this.imprimeInformacion(margen,"rp","RP:",doc,true,maxLineWidth)){
                this.fila += .3;
            }
        }

        doc.addImage(imgPie.onload(), 'JPEG', .63, 18.55, 12.7, 2.59)
        doc.save("Receta.pdf");
    }

    fnCreaCertificadoPdf() {
        let 
        pageWidth = 19.0,
        margen = 1.5,
        maxLineWidth = pageWidth,
        fontsizenormal = 12,
        fontsizesmall = 8,
        ptsPerInch = 28.34,
        lineheight = 1,
        valNombre = document.querySelector("#nombreCertificado").value;

        let doc = new jsPDF({
            orientation: "portrait",
            unit: "cm",
            format: [27.9,21.6],
            lineHeight: lineheight
        });

        var imgEncabezado = new Image();
        imgEncabezado.onload = function(){
            var dataURI = new Doctor().getBase64Image(imgEncabezado);
            return dataURI;
           }
        imgEncabezado.src = "../img/EncabezadoNuevoReceta.jpg";

        var imgPie = new Image()
        imgPie.onload = function(){
            var dataURI = new Doctor().getBase64Image(imgPie);
            return dataURI;
           }
        imgPie.src = "../img/PieDePaginaNuevoReceta.jpg";

        doc.addImage(imgEncabezado.onload(), 'JPEG', .79, .63, 20, 3.05)
        this.fila += 2;

        if (valNombre!="."){

            doc.setFontSize(fontsizenormal);
            if(this.imprimeInformacion(margen,"fechaCertificado","Fecha:",doc,false,0,true)){
                this.fila +=.5;
            }
            if(this.imprimeInformacion(margen,"nombreCertificado","Nombre:",doc)){
                this.fila +=.5;
            }
            doc.setFontSize(fontsizenormal);
            if (this.imprimeInformacion(margen,"txtTextoCertificado","",doc,true,maxLineWidth)){
                this.fila +=.8;
            }

        }

        doc.addImage(imgPie.onload(), 'JPEG', .79, 22.71, 20, 4.09)
        doc.save("Certificado.pdf");
    }

    getBase64Image = (img) => {
        var canvas = document.createElement("canvas");

        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
    
        ctx.drawImage(img, 0, 0);
    
        var dataURL = canvas.toDataURL("image/jpeg");
    
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }
}
window.onload = () => new Doctor(true)