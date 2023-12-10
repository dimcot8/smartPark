import React from "react";

import "../styles/Notification.css";

/** Notification released*/
class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleNotification: false,
      listItems: []
    };
  }
  
  componentDidMount() {
    this.setState({ listItems: this.props.listItems });
  }
  componentDidUpdate(previousProps) {
    if (previousProps.listItems !== this.props.listItems) {
      this.setState({ listItems: this.props.listItems });
    }
  }
  toggleNotification = () => {
    const { toggleNotification } = this.state;
    this.setState({ toggleNotification: !toggleNotification });
  };
  clearAllMessage = () => {
    this.props.onClearAll && this.props.onClearAll();
    this.setState({ listItems: [] });
  };
  
  generateDate = timeStamp => {
    const d = new Date(timeStamp * 1000);
    const n = d.getDate();
    const m = d.getMonth();
    const monthNames = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC"
    ];
    return { date: `${n} ${monthNames[m]}`, time: timeStamp };
  };

  render() {
    const { listItems } = this.state;
    let totalCount = 0;
    const allTimestamp = [];
    listItems.map((i, k) => {
      const test = allTimestamp.filter(
        item => item.UTC.date === this.generateDate(i.UTC).date
      );
      if (test.length === 0) {
        const itemObj = {
          UTC: this.generateDate(i.UTC),
          list: []
        };
        allTimestamp.push(itemObj);
      }
      totalCount = totalCount + i.list.length;
    });
    listItems.map((i, j) => {
      const iUTC = this.generateDate(i.UTC).date;
      const sameData = allTimestamp.filter(function(k) {
        return k.UTC.date === iUTC;
      });
      const key = sameData.length && sameData[0].UTC.date;
      allTimestamp.map(item => {
        if (item.UTC.date === key) {
          i.list.map(p => {
            p.timeStamp = i.UTC;
          });
          item.list.push(i.list);
        }
      });
    });
    return (
      <div className={"notification"} style={{ position: "relative" }}>
        <div className={"iconSection"}>
          <img
            alt={"Notification"}
            src={require("../assets/not.png")}
            onClick={() => this.toggleNotification()}
            style={{ cursor: "pointer" }}
          ></img>
          <span className={"iconBadge"}>{totalCount}</span>
        </div>
        {this.state.toggleNotification && (
          <div
            style={{
              position: "absolute",
              width: "200px",
              border: "0.5px solid #8080803d",
              minHeight: "100px",
              overflowY: "auto",
              top: "30px"
            }}
            className={"notificationBar"}
          >
            <div style={{ display: "flex" }}>
              <p style={{ fontSize: "14px", textAlign: "left", width: "93%" }}>
                Notifications
              </p>
              <img
                alt={"close"}
                onClick={() => this.toggleNotification()}
                style={{ width: "10%", cursor: "pointer" }}
                src={require("../assets/cross.png")}
              ></img>
            </div>
            {allTimestamp.map((i, k) => {
              return (
                <div>
                  <p
                    style={{
                      fontSize: "10px",
                      margin: "5px 0",
                      textAlign: "left",
                      color: "#747474",
                      display: "initial"
                    }}
                  >
                    <span style={{ display: "inline-block", width: "50%" }}>
                      
                    </span>
                    <span
                      style={{
                        display: "inline-block",
                        width: "50%",
                        textAlign: "right"
                      }}
                    >
                      {k === 0 && (
                        <img
                          alt={"clear all"}
                          style={{
                            width: "20%",
                            cursor: "pointer",
                            marginBottom: "-6px"
                          }}
                          onClick={()=>this.clearAllMessage()}
                          src={require("../assets/clear.png")}
                        ></img>
                      )}
                    </span>
                  </p>
                  {i.list.map(l => {
                    return l.map(k => {
                      const d = new Date(k.timeStamp * 1000);
                      const min = d.getUTCMinutes();
                      const hours = d.getUTCHours() % 12 || 12;
                      const amOrpm = hours >= 12 ? "pm" : "am";
                      return (
                        <div
                          style={{ background: "#fff", padding: "5px" }}
                          className={"lineItmes"}
                        >
                          <span
                            style={{ fontSize: "13px", fontWeight: 700 }}
                          >{`${k.type} `}</span>
                          <span
                            style={{
                              fontSize: "10px",
                              fontWeight: 700,
                              color: "#747474",
                              float: "right"
                            }}
                          >
                          
                          </span>
                          <div style={{ fontSize: "10px" }}>{k.content}</div>
                        </div>
                      );
                    });
                  })}
                </div>
              );
            })}
            <p style={{ textAlign: "right", margin: 0, color: "#42A5F5" }}>
              VIEW ALL
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default Notification;
