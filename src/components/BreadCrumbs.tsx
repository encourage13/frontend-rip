import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../Routes'
import './BreadCrumbs.css'

interface Crumb {
  label: string;
  path?: string;
}

interface BreadCrumbsProps {
  crumbs: Crumb[];
}

const BreadCrumbs: FC<BreadCrumbsProps> = ({ crumbs }) => {
  if (crumbs.length === 0) {
    return (
      <nav className="breadcrumbs">
        <span className="current">Главная</span>
      </nav>
    )
  }

  return (
    <nav className="breadcrumbs">
      <Link to={ROUTES.HOME}>Главная</Link>
      
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1
        
        return (
          <span key={index} className="breadcrumb-segment">
            <span className="slash">/ </span>
            {crumb.path && !isLast ? (
              <Link to={crumb.path}>{crumb.label}</Link>
            ) : (
              <span className="current">{crumb.label}</span>
            )}
          </span>
        )
      })}
    </nav>
  )
}

export default BreadCrumbs