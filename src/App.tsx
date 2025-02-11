import './styles/index.css'
import SATPrep from './components/SATPrep'
import { GameProvider } from './context/GameContext'
import { QuestionsProvider } from './context/QuestionsContext'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <GameProvider>
        <QuestionsProvider>
          <main className="min-h-screen bg-gray-900 text-gray-100">
            <SATPrep />
          </main>
        </QuestionsProvider>
      </GameProvider>
    </ErrorBoundary>
  )
}

export default App