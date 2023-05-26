import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import instance from '../../api/api_instace'
import './listArticle.css'

import { Button } from '../../components'

const ListArticle = () => {
  // deklarasi hooks
  const [articles, setArticles] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [articlesPerPage] = useState(5) // Jumlah artikel per halaman
  const [searchTerm, setSearchTerm] = useState('') // Kata kunci pencarian

  // pasang useNavigate
  const navigate = useNavigate()
  useEffect(() => {
    document.title = 'List Article'

    const getArticle = async () => {
      try {
        const res = await instance.get(`articles`)
        console.log(res)
        setArticles(res.data.data)
      } catch (error) {
        console.error(error)
      }
    }

    getArticle()
  }, [])
  // pasang handleDelete
  const handleDelete = async (id) => {
    const confirmed = window.confirm('Do you want to delete?')
    if (confirmed) {
      try {
        await instance.delete(`article/delete/${id}`)
        window.alert('Data berhasil dihapus!')
        // jika data article yang dicari tidak ada akan memperbaharui data
        setArticles(articles.filter((article) => article.id_article !== id))
        navigate('/')
      } catch (error) {
        console.log(error)
        window.alert('Terjadi kesalahan saat menghapus data')
      }
    }
  }
  // Mencari artikel berdasarkan judul (title)
  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Mengatur halaman saat ini
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  // Menghitung total halaman
  const totalPages = Math.ceil(articles.length / articlesPerPage)
  // Menghitung indeks artikel yang akan ditampilkan di halaman saat ini
  const indexOfLastArticle = currentPage * articlesPerPage
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage
  const currentArticles = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  )

  // Menghasilkan tombol halaman
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(articles.length / articlesPerPage); i++) {
    pageNumbers.push(i)
  }
  return (
    <>
      <div className='container mt-5'>
        <h1 className='text-center title'>All Articles </h1>
        <div className='row'>
          <div className='col-md-9'>
            <Link to='/add-article'>
              <Button
                label='add article '
                variant='outline-primary'
                icon='plus'
                className='color'
              />
            </Link>
          </div>
          <div className='col-md-3'>
            <form className='d-flex' role='search'>
              <input
                className='form-control me-2'
                type='search'
                placeholder='Search'
                aria-label='Search'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>
        </div>

        <br />
        <table className='table table-striped '>
          <thead className='text-center  color-head'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Title</th>
              <th scope='col'>Description</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody className='table-group-divider text-center'>
            {currentArticles.map((article, index) => (
              <tr key={index}>
                <th scope='row'>{(index = index + 1)}</th>
                <td>{article.title}</td>
                <td>{article.description}</td>
                <td>
                  <div className='btn-group '>
                    <Link to={`/update-article/${article.id_article}`}>
                      <Button icon='edit' variant='outline-primary mx-1' />
                    </Link>
                    <Link to='#'>
                      <Button
                        onClick={() => handleDelete(article.id_article)}
                        icon='trash'
                        variant='outline-danger'
                      />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* pasang pagination */}
        <nav aria-label='Page navigation example'>
          <ul className='pagination justify-content-end'>
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className='page-link'
                onClick={() => paginate(currentPage - 1)}
              >
                Previous
              </button>
            </li>
            {pageNumbers.map((number) => (
              <li
                key={number}
                className={`page-item ${
                  currentPage === number ? 'active' : ''
                }`}
              >
                <button className='page-link' onClick={() => paginate(number)}>
                  {number}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages ? 'disabled' : ''
              }`}
            >
              <button
                className='page-link'
                onClick={() => paginate(currentPage + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}

export default ListArticle
