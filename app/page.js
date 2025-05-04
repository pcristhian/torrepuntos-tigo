'use client';
import { useState } from 'react';
import personasData from './data/personas';
import Slider from 'react-slick';
import './globals.css';

export default function Home() {
  const [busqueda, setBusqueda] = useState('');
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [modalPremio, setModalPremio] = useState(false);
  const [modalCarrusel, setModalCarrusel] = useState(false);

  const premios = [
    { id: 1, imagen: 'https://res.cloudinary.com/dlll6ncvv/image/upload/premio1_scpcjj.webp', nombre: 'Taza', puntos: 300 },
    { id: 2, imagen: 'https://res.cloudinary.com/dlll6ncvv/image/upload/premio2_qflsmp.jpg', nombre: 'Juego de 6 vasos', puntos: 600 },
    { id: 3, imagen: 'https://res.cloudinary.com/dlll6ncvv/image/upload/premio3_xgxldz.webp', nombre: 'Alcuza', puntos: 1200 },
    { id: 4, imagen: 'https://res.cloudinary.com/dlll6ncvv/image/upload/premio4_gzfyon.jpg', nombre: 'Termo', puntos: 2500 },
    { id: 5, imagen: 'https://res.cloudinary.com/dlll6ncvv/image/upload/premio5_xcgqay.png', nombre: 'Caldera Electrica', puntos: 2500 },
    { id: 6, imagen: 'https://res.cloudinary.com/dlll6ncvv/image/upload/premio6_nvs07o.webp', nombre: 'Set de Utensilios de cocina', puntos: 2500 },
  ];

  const premiosReclamados = {
    1: false,
    2: false,
    3: true,  // Reclamado
    4: false,
    5: true,  // Reclamado
    6: false,
  };

  const obtenerPremioMasCercano = (puntosCliente) => {
    const premio = premios
      .filter((premio) => premio.puntos <= puntosCliente)
      .sort((a, b) => b.puntos - a.puntos)[0];
    return premio || premios[0];
  };

  const clientesFiltrados = personasData
    .filter((persona) => {
      const texto = `${persona.nombre} ${persona.apellido} ${persona.codigo}`.toLowerCase();
      return texto.includes(busqueda.toLowerCase());
    })
    .sort((a, b) => b.puntos - a.puntos);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <main className="min-h-screen bg-sky-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="sticky top-0 bg-sky-50 z-40 pb-4 pt-2">
          <h1 className="text-3xl font-bold text-sky-800 mb-2 text-center">Listado de Clientes</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por nombre o código..."
              className="w-full p-3 pr-12 rounded-lg border border-sky-300 shadow-sm text-sky-800 placeholder-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            {busqueda && (
              <button
                onClick={() => setBusqueda('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-sky-100 text-sky-700 hover:bg-sky-200 rounded-full px-3 py-1 text-sm shadow-sm"
              >
                Limpiar
              </button>
            )}
          </div>
        </div>

        <div className="grid gap-4">
          {clientesFiltrados.map((persona, index) => (
            <div
              key={index}
              className="bg-white border border-sky-200 shadow-md rounded-xl p-4 hover:shadow-lg transition flex flex-col sm:flex-row sm:items-center gap-4"
              onClick={() => {
                setClienteSeleccionado(persona);
                setModalPremio(true);
              }}
            >
              <div className="flex-grow">
                <p className="text-sky-900 font-semibold">
                  Nombre: <span className="font-normal">{persona.nombre} {persona.apellido}</span>
                </p>
                <p className="text-sky-900 font-semibold">Código: <span className="font-normal">{persona.codigo}</span></p>
                <p className="text-sky-900 font-semibold">Puntos: <span className="font-normal">{persona.puntos}</span></p>
              </div>
              <div className="ml-4">
                <img
                  src={persona.imagen}
                  alt={`${persona.nombre} ${persona.apellido}`}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-full mx-auto sm:mx-0"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

        {clientesFiltrados.length === 0 && (
          <p className="text-center text-sky-600 mt-6">No se encontraron resultados.</p>
        )}
      </div>

     {/* Modal del Premio Más Cercano */}
{modalPremio && clienteSeleccionado && (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 animate-fadeInBackdrop"
    onClick={() => setModalPremio(false)}
  >
    <div
      className="bg-white p-4 sm:p-6 rounded-lg w-[95%] max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 opacity-0 animate-fadeInModal"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-xl font-semibold text-center mb-4">Premio más cercano</h2>
      <div className="flex justify-center flex-col items-center mb-6 relative">
        <img
          src={obtenerPremioMasCercano(clienteSeleccionado.puntos).imagen}
          alt="Premio cercano"
          className="w-full max-h-60 object-contain rounded-lg mb-4"
        />
        {premiosReclamados[obtenerPremioMasCercano(clienteSeleccionado.puntos).id] && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-60 rounded-lg pointer-events-none">
            <span className="text-red-600 font-extrabold text-3xl transform rotate-12 opacity-90">
              ¡RECLAMADO!
            </span>
          </div>
        )}
        <p className="text-sky-800 text-lg font-semibold text-center">
          {obtenerPremioMasCercano(clienteSeleccionado.puntos).nombre}
        </p>
        <p className="text-sky-600 text-sm text-center">
          {obtenerPremioMasCercano(clienteSeleccionado.puntos).puntos} Pts
        </p>
        <p className="text-sky-600 mt-4 text-center">
          ¡Apersonate a TorreFuerte - Tigo para reclamar tu premio lo antes posible!
        </p>
        <p className="text-sky-600 mt-4 text-center">
          Dirección: Plaza Ballivián lado cajero BancoSol
        </p>
        <a
          href="https://maps.app.goo.gl/nfntccVpzBf16nzq6"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-600 mt-2 underline text-center block"
        >
          Ver dirección en Google Maps
        </a>
        <button
          onClick={() => setModalPremio(false)}
          className="mt-6 px-4 py-2 bg-sky-600 text-white rounded-full hover:bg-sky-700"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
)}


      {/* Modal del Carrusel de Premios */}
      {modalCarrusel && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 animate-fadeInBackdrop"
          onClick={() => setModalCarrusel(false)}
        >
          <div
            className="bg-white p-4 sm:p-6 rounded-lg w-[95%] max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 opacity-0 animate-fadeInModal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold text-center mb-4">Todos los Premios</h2>
            <Slider {...settings}>
              {premios.map((premio) => (
                <div key={premio.id} className="relative flex flex-col items-center">
                  <img
                    src={premio.imagen}
                    alt={premio.nombre}
                    className="w-full max-h-60 object-contain mb-4"
                  />
                  {premiosReclamados[premio.id] && (
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-60">
                      <span className="text-red-600 font-extrabold text-3xl transform rotate-12 opacity-90">
                        ¡RECLAMADO!
                      </span>
                    </div>
                  )}
                  <p className="text-sky-800 text-lg font-semibold text-center">{premio.nombre}</p>
                  <p className="text-sky-600 text-sm text-center">{premio.puntos} Pts</p>
                </div>
              ))}
            </Slider>
            <div className="text-center mt-6">
              <button
                onClick={() => setModalCarrusel(false)}
                className="px-4 py-2 bg-sky-600 text-white rounded-full hover:bg-sky-700"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Botón flotante para ver premios */}
      <button
        onClick={() => setModalCarrusel(true)}
        className="fixed bottom-4 left-4 right-4 sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2 px-4 py-3 bg-sky-600 text-white rounded-full shadow-lg hover:bg-sky-700 focus:outline-none z-50 text-center text-sm sm:text-base"
      >
        Ver Premios
      </button>
    </main>
  );
}
