import { useCallback, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { v4 as uudi } from "uuid";
import { Subject } from "rxjs";

mapboxgl.accessToken =
  "pk.eyJ1IjoianBibWRldiIsImEiOiJja3VjdzZobG8xNGVpMnFvOHQ1dG44NWRuIn0.GgCaoDpmdoCzyWxlJBvjNQ";

export const useMapbox = (puntoInicial: {
  lng: number;
  lat: number;
  zoom: number;
}) => {
  //Referencia al Div del mapa
  const setRef = useCallback((node) => {
    mapaDiv.current = node;
  }, []);
  const mapaDiv = useRef<any>();
  //Mapa y cordenadas
  const mapa = useRef<any>();
  const [coords, setCoords] = useState(puntoInicial);
  //Referencia a los marcadores
  const marcadores = useRef<any>({});

  //Observables de Rxjs
  const movimietnoMarcador = useRef(new Subject());
  const nuevoMarcador = useRef(new Subject());

  //Funcion para agregar marcadores
  const agregarMarcador = useCallback((ev: any) => {
    const { lng, lat } = ev.lngLat;

    const marker = new mapboxgl.Marker();

    marker.setLngLat([lng, lat]).addTo(mapa.current).setDraggable(true);

    const id = uudi();
    marcadores.current[id] = marker;

    //Si el marcador tienen id no emitir
    nuevoMarcador.current.next({
      id,
      lng,
      lat,
    });

    //Escuchar movimientos del maracador
    marker.on("drag", (ev: any) => {
      const { lng, lat } = ev.target.getLngLat();
      movimietnoMarcador.current.next({ id, lng, lat });
    });
  }, []);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapaDiv.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [puntoInicial.lng, puntoInicial.lat],
      zoom: puntoInicial.zoom,
    });
    mapa.current = map;
  }, [puntoInicial]);

  useEffect(() => {
    mapa.current?.on("move", () => {
      const { lng, lat } = mapa.current.getCenter();
      setCoords({
        lng: parseFloat(lng.toFixed(4)),
        lat: parseFloat(lat.toFixed(4)),
        zoom: parseFloat(mapa.current.getZoom().toFixed(2)),
      });
    });
  }, []);

  useEffect(() => {
    mapa.current?.on("click", agregarMarcador);
  }, [agregarMarcador]);

  return {
    coords,
    setRef,
    agregarMarcador,
    nuevoMarcador$: nuevoMarcador.current,
    movimietnoMarcador$: movimietnoMarcador.current,
  };
};
