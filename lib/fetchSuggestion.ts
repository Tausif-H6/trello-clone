import formatTodosForAI from "./formatTodosForAI";
const fetchSuggestion = async (board: Board) => {
    const todos = formatTodosForAI(board);
    console.log("Formatted Todos for send",todos);
    
    const res = await fetch("/api/generateSummary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Corrected "jason" to "json"
      },
      body: JSON.stringify({ todos }),
    });
    console.log("GPT res",res);
    
    if (res.status === 200) {
        const text = await res.text();
        if (text) {
          const GPTdata = JSON.parse(text);
          const { content } = GPTdata;
          return content;
        } else {
          // Handle the empty response here (e.g., return a default value or throw an error)
          console.log("Failed to get GTP response",res);
          
        }
    }
  };
  export default fetchSuggestion;
