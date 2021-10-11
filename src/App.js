import React, { useState, useEffect } from 'react';
import reactDom from 'react-dom';

export default function App() {
  const [repositories, setRepositories] = useState([])

  function handleAddRepository() {
    setRepositories([...repositories, { id: Math.random(), name: "novo repo" }])
  }

  useEffect(async () => {
    const response = await fetch('https://api.github.com/users/amorimcode/repos')
    const data = await response.json();

    setRepositories(data);
  }, [])  // useEffects dispara função quando a variável repositories mudar

  useEffect(()=> {
    const filtered = repositories.filter(repo => repo.favorite)

    document.title = `Você tem ${filtered.length} favoritos`
  }, [repositories])

  function handleFavorite(id) {
    const newRepositories = repositories.map(repo => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo
    })

    setRepositories(newRepositories)
  }

  return (
    <ul>
      {repositories.map(repo => (
        <li key={repo.id}>
          {repo.name}
          {repo.favorite && <span>(Favorito) </span>}
          <button onClick={() => handleFavorite(repo.id)} >Favoritar</button>
        </li>

      ))}
    </ul>
  )

}