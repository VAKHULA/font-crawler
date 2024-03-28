'use client'

import { useState } from "react";
import isUrl from "is-url"

export default function Home() {
  const [url, setUrl] = useState('')
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getResult = async (url: string) => {
    setIsLoading(true)

    try {
      const resp = await fetch(`/api?url=${url}`)
      const data = await resp.json() || []
      setResults(data)
      setIsLoading(false)
    } catch (error) {
      setResults([])
      setIsLoading(false)
    }
  }

  const handleChange = (e: any) => {
    setUrl(e.target.value)
  }

  const handleSearch = (event: any) => {
    if (event.key === 'Enter') {
      if (isUrl(url)) {
        getResult(url)
      } else {
        alert('wrong URL')
      }
    }
  }

  return (
    <main className="container">
      <input
        type="search"
        name="search"
        placeholder="Search"
        aria-label="Search"
        pattern="http(s?)(:\/\/)((www.)?)([a-zA-z0-9\-_]+)(.com)"
        value={url}
        onChange={handleChange}
        onKeyDown={handleSearch}
      />
      <article aria-busy={isLoading ? "true" : "false"}>
        {!isLoading && results.map((font) => (<><span>{font}</span><br /></>))}
      </article>
    </main>
  );
}
