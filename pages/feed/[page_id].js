import styles from '../../styles/feed.module.css'
import {useRouter} from 'next/router'
import {Toolbar} from '../../components/toolbar'

export const Feed = ({pageNumber, articles})  => {
  const router = useRouter();
  return (
    <div className={"page-container"}>
      <Toolbar/>
      <div className={styles.main}>
        { articles.map((article, index ) => (
            <div key={index} className={styles.post}>
              <h1 onClick={()=>(window.location.href=article.url)}>{article.title.toUpperCase()}</h1>
              <p>{article.description}</p>
              {!!article.urlToImage && <img src={article.urlToImage}/>}
            </div>
          ))
        }
      </div>
      <div className={styles.paginator}>
        <div
          onClick={()=>{
            if (pageNumber >1){
              router.push(`/feed/${pageNumber-1}`)
            }
          }}
          className={pageNumber ===1 ? styles.disabled : styles.active}>Previous Page
        </div>
        <div className># {pageNumber}</div>
        <div
          onClick={()=>{
            if (pageNumber < 5){
              router.push(`/feed/${pageNumber+1}`)
            }
          }}
          className={pageNumber ===5 ? styles.disabled : styles.active}>Next Page
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async pageContext => {

  const pageNumber = await pageContext.query.page_id;

  if (!pageNumber || pageNumber < 1|| pageNumber > 5 ){
    return {
      props: {
        articles: [],
        pageNumber:1
      }
    }
  }
  const today = new Date()
  const yesterday = new Date(today)

  yesterday.setDate(yesterday.getDate() - 1)

  today.toDateString()
  yesterday.toDateString()

  const response = await fetch(`https://newsapi.org/v2/top-headlines?country=mx&pageSize=5&page=${pageNumber}&from=${yesterday}&to=${today}&sortBy=popularity`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEWZ_API_KEY}`,
      },
    }
  );

  const responsejson = await response.json();
  const {articles} =  await responsejson
  return {
    props: {
      articles,
      pageNumber : Number.parseInt(pageNumber)
    }
  }
};

export default Feed;
