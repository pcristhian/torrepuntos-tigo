'use client';
import { useState } from 'react';
import personasData from './data/personas';
import Slider from 'react-slick';
import './globals.css';

export default function Home() {
  const [busqueda, setBusqueda] = useState('');
  const [showPremios, setShowPremios] = useState(false);

  const clientesFiltrados = personasData.filter((persona) => {
    const texto = `${persona.nombre} ${persona.apellido} ${persona.codigo}`.toLowerCase();
    return texto.includes(busqueda.toLowerCase());
  });

  const totalClientes = clientesFiltrados.length;
  const totalPuntos = clientesFiltrados.reduce((sum, persona) => sum + persona.puntos, 0);
  const promedioPuntos = totalClientes ? (totalPuntos / totalClientes).toFixed(2) : 0;

  const premios = [
    { id: 1, imagen: '/img/premio1.jpg', nombre: 'Taza', puntos: 300 },
    { id: 2, imagen: '/img/premio2.jpg', nombre: 'Juego de 6 vasos', puntos: 600 },
    { id: 3, imagen: '/img/premio3.jpg', nombre: 'Alcuza', puntos: 1200 },
    { id: 4, imagen: '/img/premio4.jpg', nombre: 'Termo', puntos: 2500 },
    { id: 5, imagen: '/img/premio5.jpg', nombre: 'Caldera Electrica', puntos: 2500 },
    { id: 6, imagen: '/img/premio6.jpg', nombre: 'Set de Utensilios de cocina', puntos: 2500 },
  ];

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
        <h1 className="text-3xl font-bold text-sky-800 mb-4 text-center">
          Listado de Clientes
        </h1>

        <div className="relative mb-6">
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

        <div className="flex justify-center items-center space-x-6 mb-6">
          <div className="text-center text-sky-800 text-sm">
            <p className="font-semibold">
              {totalClientes} {totalClientes === 1 ? 'Cliente' : 'Clientes'}
            </p>
          </div>
          <div className="text-center text-sky-800 text-sm">
            <p className="font-semibold">{totalPuntos} Puntos Totales</p>
          </div>
          <div className="text-center text-sky-800 text-sm">
            <p className="font-semibold">Promedio: {promedioPuntos} Puntos</p>
          </div>
        </div>

        <div className="grid gap-4">
          {clientesFiltrados.map((persona, index) => (
            <div
              key={index}
              className="bg-white border border-sky-200 shadow-md rounded-xl p-4 hover:shadow-lg transition"
            >
              <p className="text-sky-900 font-semibold">
                Nombre:{' '}
                <span className="font-normal">
                  {persona.nombre} {persona.apellido}
                </span>
              </p>
              <p className="text-sky-900 font-semibold">
                Código: <span className="font-normal">{persona.codigo}</span>
              </p>
              <p className="text-sky-900 font-semibold">
                Puntos: <span className="font-normal">{persona.puntos}</span>
              </p>
            </div>
          ))}
        </div>

        {clientesFiltrados.length === 0 && (
          <p className="text-center text-sky-600 mt-6">No se encontraron resultados.</p>
        )}

        <button
          onClick={() => setShowPremios(!showPremios)}
          className="w-full mt-6 py-3 bg-sky-600 text-white rounded-lg shadow-md hover:bg-sky-700 focus:outline-none"
        >
          {showPremios ? 'Cerrar Premios' : 'Ver Premios'}
        </button>

        {showPremios && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-3/4 max-w-2xl">
              <Slider {...settings}>
              {premios.map((premio) => (
  <div key={premio.id} className="flex justify-center flex-col items-center">
    <img
      src={premio.imagen}
      alt={`Premio ${premio.id}`}
      className="w-full max-h-60 object-contain rounded-lg mb-4"
    />
    <div className="text-center">
      {/* Nombre en la primera fila */}
      <p className="text-sky-800 text-lg font-semibold">{premio.nombre}</p>
      {/* Puntos en la segunda fila */}
      <p className="text-sky-600 text-sm">{premio.puntos} Pts</p>
    </div>
  </div>
))}


              </Slider>
              <button
                onClick={() => setShowPremios(false)}
                className="mt-4 w-full py-2 bg-sky-600 text-white rounded-lg"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
