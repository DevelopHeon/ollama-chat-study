const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f4f8',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    chatWindow: {
      height: '500px',
      overflowY: 'scroll',
      padding: '20px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      marginBottom: '20px',
    },
    userMessage: {
      backgroundColor: '#e3f2fd',
      padding: '10px',
      borderRadius: '8px',
      marginBottom: '10px',
      maxWidth: '70%',
      alignSelf: 'flex-end',
      marginLeft: 'auto',
    },
    botMessage: {
      backgroundColor: '#f1f8e9',
      padding: '10px',
      borderRadius: '8px',
      marginBottom: '10px',
      maxWidth: '70%',
    },
    errorMessage: {
      color: '#d32f2f',
      backgroundColor: '#ffcdd2',
      padding: '10px',
      borderRadius: '8px',
      marginBottom: '10px',
    },
    inputContainer: {
      display: 'flex',
      gap: '10px',
    },
    input: {
      flex: 1,
      padding: '10px',
      fontSize: '16px',
      borderRadius: '4px',
      border: '1px solid #ccc',
    },
    button: {
      padding: '10px 20px',
      fontSize: '16px',
      backgroundColor: '#4caf50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  };
  
  export default styles;