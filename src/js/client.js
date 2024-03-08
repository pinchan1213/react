import React from "react";
import  ReactDOM  from "react";

// Reactコンポーネントの定義
// Layoutという名前でReact.componetを継承している
class Layout extends React.component{
  // どのように表示されているかを定義している
  render(){
    return (
      <h1>Welcome!</h1>
    );
  }
}

const app = document.getElementById('app');
// Layoutコンポーネントをapp要素にレンダリングしている
ReactDOM.render(<Layout/>,app);