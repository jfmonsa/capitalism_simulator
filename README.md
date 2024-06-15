# React + Vite + Autómatas Celulares
# Capitalism Simulator

## Descripción
Capitalism Simulator es una aplicación web interactiva diseñada para simular y visualizar la distribución de ingresos en una sociedad capitalista, catalogando a las personas por clases sociales según sus ingresos. La simulación utiliza diferentes modelos para calcular niveles de ingresos, el índice de Gini y otras métricas económicas importantes.

## Repositorio Público
Este es un repositorio público. Para clonar el repositorio y ejecutar la aplicación en tu máquina local, sigue las instrucciones a continuación.

## Requisitos
- Node.js
- npm (Node Package Manager)

## Instalación
1. Clona el repositorio:
```
git clone <URL_DEL_REPOSITORIO>
```
3. Navega al directorio del proyecto:
```
    cd capitalism_simulator
```
5. Instala las dependencias:
```
    npm install
```
## Ejecución (primera forma)

1. Inicia la aplicación:
```
    npm run dev
```
3. Abre tu navegador y navega a `http://localhost:5173/` o simplemente da ctrl + click izq sobre el link que te muestra al iniciar la aplicación.

## Ejecución (segunda forma)
2. Abre tu navegador y navega a https://vidaartificial.netlify.app/

## Uso de la Aplicación
Una vez que la aplicación esté corriendo, verás una interfaz gráfica con varios componentes y botones que te permitirán interactuar con la simulación.

### Componentes Principales
- Canvas: Muestra una cuadrícula visual donde se representan los diferentes niveles de ingresos.
- Estadísticas: Muestra información en tiempo real como el índice de Gini y otras métricas económicas.

### Botones y Controles
- Start Simulation: Inicia la simulación de la distribución de ingresos.
- Pause Simulation: Pausa la simulación en curso.
- Reset Simulation: Reinicia la simulación a su estado inicial.
- Adjust Parameters: Permite ajustar parámetros de la simulación como la distribución de ingresos inicial y otros factores económicos (esto desde el código).
