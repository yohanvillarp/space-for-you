import { Link } from 'react-router'
import { ROUTES } from '@/shared/config'
import { Container, Button } from '@/shared/ui'

export function NotFoundPage() {
  return (
    <section className="py-20 flex-1 flex flex-col justify-center text-center">
      <Container className="space-y-4 max-w-md">
        <h1 className="text-6xl font-black text-primary">404</h1>
        <h2 className="text-2xl font-bold text-text-primary">Página no encontrada</h2>
        <p className="text-text-secondary text-sm">
          La ruta solicitada no existe o fue movida.
        </p>
        <div className="pt-4">
          <Link to={ROUTES.HOME}>
            <Button variant="primary">Volver al inicio</Button>
          </Link>
        </div>
      </Container>
    </section>
  )
}
