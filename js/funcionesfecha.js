export function fecha_amd(strFecha=""){
    const dia=strFecha.substring(8),
    mes=strFecha.substring(5,7),
    año=strFecha.substring(0,4);
    const fecha = `${dia}-${mes}-${año}`;
    return fecha;
}