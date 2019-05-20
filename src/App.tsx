import * as React from "react";
import logo from "./logo.svg";
import styles from "./App.module.css";
import cx from "classnames";

import { divideRupiah, DivideResultItem } from "./utils/conversion";
import { validateInput } from "./utils/inputValidator";

class App extends React.Component {
  state = {
    ammountText: "",
    isError: false,
    isErrorShake: false,
    result: [],
    left: 0,
    isLoadingParsing: false
  };

  parseInput(ammount: number) {
    this.setState({
      result: [],
      left: 0,
      isLoadingParsing: true
    });
    const parsedInput = divideRupiah(ammount);
    setTimeout(() => {
      this.setState({
        error: false,
        result: parsedInput.result,
        left: parsedInput.ammountLeft,
        isLoadingParsing: false
      });
    }, 1250);
  }

  onInput() {
    const validatedInput = validateInput(this.state.ammountText);
    if (validatedInput === null) {
      this.setState({ error: true });
      this.setState({ isErrorShake: true }, () => {
        setTimeout(() => {
          this.setState({ isErrorShake: false });
        }, 500);
      });
      return;
    }

    this.parseInput(validatedInput);
  }

  renderItem(rupiahValue: DivideResultItem) {
    return (
      <div className="card mt-2 p-3">
        <h6 className="text-center ">
          Pecahan {rupiahValue.fractionType} sejumlah {rupiahValue.count}
        </h6>
      </div>
    );
  }

  render() {
    const {
      isError,
      ammountText,
      isErrorShake,
      result,
      left,
      isLoadingParsing
    } = this.state;

    const isDisplayResult = !isError && !isLoadingParsing && result.length > 0;
    return (
      <main>
        <header className={cx(styles.header, "p-3")}>
          <h3>SitungPecah</h3>
        </header>
        <div className="px-3 mx-3 py-4 my-4 p-md-5 m-md-5">
          <h3 className="text-center mb-5">Masukan Jumlah Rupiah</h3>
          <div
            className={cx("input-group", {
              ["border border-danger rounded"]: isError,
              [styles.isErrorShake]: isErrorShake
            })}
          >
            <div className="input-group-prepend">
              <span
                className={cx("input-group-text", {
                  ["text-danger"]: isError
                })}
              >
                Ammount
              </span>
            </div>
            <input
              onKeyDown={e => {
                if (e.keyCode === 13) {
                  this.onInput();
                }
              }}
              onChange={e =>
                this.setState({ ammountText: e.currentTarget.value })
              }
              value={ammountText}
              type="text"
              className="form-control"
            />
          </div>
          {isError && (
            <p className="text-center mt-2 text-danger">
              Maaf, nilai yang kamu masukan gak valid nih
            </p>
          )}

          <div className="text-center mt-5">
            <button
              onClick={() => this.onInput()}
              className="btn btn-outline-primary btn-lg"
            >
              Pecahkan Saja Rupiahnya
            </button>
          </div>

          {isLoadingParsing && (
            <div className="mt-5">
              <h4 className="text-center">Loading...</h4>
            </div>
          )}
          {isDisplayResult && (
            <div className="mt-5">
              <h5 className="text-center mb-4">Rupiah yang Dibutuhkan</h5>
              {result.map(this.renderItem)}
              {left > 0 && (
                <div className="card mt-2 p-3">
                  <h6 className="text-center ">Sisa {left} Rupiah</h6>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    );
  }
}

export default App;
