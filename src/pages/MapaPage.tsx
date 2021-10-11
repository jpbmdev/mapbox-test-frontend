import React, { useEffect } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { useMapbox } from "../hooks/useMapbox";

const puntoInicial = {
  lng: 5,
  lat: 34,
  zoom: 2,
};

export const MapaPage: React.FC = () => {
  const { setRef, coords, nuevoMarcador$, movimietnoMarcador$ } =
    useMapbox(puntoInicial);

  useEffect(() => {
    nuevoMarcador$.subscribe((marcador) => {
      console.log(marcador);
    });
  }, [nuevoMarcador$]);

  useEffect(() => {
    movimietnoMarcador$.subscribe((marcador) => {
      console.log(marcador);
    });
  }, [movimietnoMarcador$]);

  return (
    <>
      <div className="info">
        Lng: {coords.lng} | Lat: {coords.lng} | Zoom: {coords.zoom}
      </div>
      <div ref={setRef} className="mapContainer"></div>
    </>
  );
};
