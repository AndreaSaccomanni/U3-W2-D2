import { useState, useEffect } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";

const CommentArea = ({ asin }) => {
  // state = {
  //   comments: [],
  //   isLoading: false,
  //   isError: false,
  // };

  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // componentDidUpdate = async (prevProps) => {
  //   if (prevProps.asin !== this.props.asin) {
  //     this.setState({
  //       isLoading: true,
  //     });
  //     try {
  //       let response = await fetch(
  //         "https://striveschool-api.herokuapp.com/api/comments/" + this.props.asin,
  //         {
  //           headers: {
  //             Authorization:
  //               "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzNiYTlkYmRkMDNhNjAwMTUwOWJhNTMiLCJpYXQiOjE3MzI4MDI3ODksImV4cCI6MTczNDAxMjM4OX0.-qUlEXNSeD8L4AiPY83QV21uD4L-zuUOU4T8r71-rsc",
  //           },
  //         }
  //       );
  //       console.log(response);
  //       if (response.ok) {
  //         let comments = await response.json();
  //         this.setState({
  //           comments: comments,
  //           isLoading: false,
  //           isError: false,
  //         });
  //       } else {
  //         this.setState({ isLoading: false, isError: true });
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       this.setState({ isLoading: false, isError: true });
  //     }
  //   }
  // };

  // Effetto per sostituire componentDidUpdate
  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true); // Inizia il caricamento
      try {
        let response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${asin}`, {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzNiYTlkYmRkMDNhNjAwMTUwOWJhNTMiLCJpYXQiOjE3MzI4MDI3ODksImV4cCI6MTczNDAxMjM4OX0.-qUlEXNSeD8L4AiPY83QV21uD4L-zuUOU4T8r71-rsc"
          }
        });
        console.log(response);
        if (response.ok) {
          let fetchedComments = await response.json();
          setComments(fetchedComments); // Aggiorna i commenti
          setIsError(false); // Resetta l'errore
        } else {
          setIsError(true); // Imposta errore
        }
      } catch (error) {
        console.error(error);
        setIsError(true); // Imposta errore
      } finally {
        setIsLoading(false); // Termina il caricamento
      }
    };

    if (asin) {
      fetchComments(); // Richiama fetch quando cambia asin
    }
  }, [asin]); // Effetto dipende da asin

  return (
    <div className="text-center">
      {/* {this.state.isLoading && <Loading />} */}
      {isLoading && <Loading />}
      {/* {this.state.isError && <Error />} */}
      {isError && <Error />}
      {/* <AddComment asin={this.props.asin} /> */}
      <AddComment asin={asin} />
      {/* <CommentList commentsToShow={this.state.comments} /> */}
      <CommentList commentsToShow={comments} />
    </div>
  );
};

export default CommentArea;
