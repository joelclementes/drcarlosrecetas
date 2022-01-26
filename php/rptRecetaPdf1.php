<?php 
require('../fpdf/html2pdf.php');

$pdf = new PDF_HTML();


//$pdf->AliasNbPages();
$pdf->SetFillColor(232,232,232);
$pdf->SetLinewidth(.6);
// $pdf->AddPage('Portrait','Letter');
$pdf->AddPage('Portrait',[140,210]);
$pdf->SetMargins(10,.5,1,.5);

$pdf->WriteHTML('<img src="../../img/EncabezadoReceta-01.jpg" alt="Encabezado receta" width="340%">');

$pdf->SetY(30); $pdf->SetX(9);
$pdf->SetFont('Times','',12);
$pdf->Cell(42,8,"Nombre: ".utf8_decode($_GET["nombre"];
$pdf->Ln(2);


$pdf->SetY(180); $pdf->SetX(10);
$pdf->WriteHTML('<img src="../../img/PieDePaginaReceta-02.jpg" alt="Encabezado receta" width="340%">');

$pdf->Output();
?>