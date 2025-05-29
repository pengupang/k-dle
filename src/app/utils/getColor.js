export function getColor(valor, valorCorrecto){
  if (valor === valorCorrecto) {
    return "bg-green-400 text-white";
  } else if (
    typeof valor === "string" &&
    typeof valorCorrecto === "string" &&
    valor.toLowerCase().includes(valorCorrecto.toLowerCase())
  ) {
    return "bg-yellow-300 text-black"; // casi
  } else {
    return "bg-slate-300 text-white"; // incorrecto
  }
};