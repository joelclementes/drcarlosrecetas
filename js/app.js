class Receta{

    
    constructor(reset=false){
        if (reset){
            

            $(".wyswyg").summernote({
                toolbar:[
        
                ]
              });

              document.querySelector("#peso").addEventListener("change", () =>{
                  new Receta().fnCalculaImc(
                    document.querySelector("#peso").value,
                    document.querySelector("#talla").value
                  );
              })

              document.querySelector("#talla").addEventListener("change", () =>{
                new Receta().fnCalculaImc(
                  document.querySelector("#peso").value,
                  document.querySelector("#talla").value
                );
            })

            document.querySelector("#btnImprimirReceta").addEventListener("click", () => {
                if (document.querySelector("#nombre").value=="") return;

                const doc = new jsPDF({
                    orientation: "portrait",
                    unit: "in",
                    format: [4, 2]
                  });
                  
                  doc.text("Se creará la receta!", 1, 1);
                //   doc.save("receta.pdf");
                //   doc.save();
                doc.output()
                  

            })


        }
    }

    fnAbrirVentana(pagina) {
        var opciones="toolbar=no, location=no, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=yes, width=1366, height=768, top=85, left=140";
        window.open(pagina,"",opciones);
    }

    fnCalculaImc = (peso,talla) =>{
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


}
window.onload = () => new Receta(true)