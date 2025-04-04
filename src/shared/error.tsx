const ErrorContainer = ({errorMsg, retry}: {
    errorMsg: string;
  retry?: () => void;
}) => { 

return(
      <div className="alert alert-danger error-container" role="alert">
                {`${errorMsg} `}
                <a
                  href="#"
                  onClick={retry}
                  role="Retry Again"
                  className="alert-link"
                >
                    <br/>
                  Retry Again after sometime!!!
                </a>  
              </div>
)

}

export default ErrorContainer;  