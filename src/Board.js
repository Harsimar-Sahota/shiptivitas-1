import React from "react";
import Dragula from "dragula";
import "dragula/dist/dragula.css";
import Swimlane from "./Swimlane";
import "./Board.css";

export default class Board extends React.Component {
  constructor(props) {
    super(props);

    const clients = this.getClients();

    this.state = {
      clients: {
        backlog: clients.filter(
          (client) => !client.status || client.status === "backlog"
        ),
        inProgress: clients.filter(
          (client) => client.status === "in-progress"
        ),
        complete: clients.filter(
          (client) => client.status === "complete"
        ),
      },
    };

    // Refs for Dragula
    this.swimlanes = {
      backlog: React.createRef(),
      inProgress: React.createRef(),
      complete: React.createRef(),
    };
  }

  componentDidMount() {
    const containers = [
      this.swimlanes.backlog.current,
      this.swimlanes.inProgress.current,
      this.swimlanes.complete.current,
    ].filter(Boolean);

    if (containers.length) {
      Dragula(containers, {
  moves: function (el) {
    return el.classList.contains("Client");
  }
});

    }
  }

  getClients() {
    return [
      ["1", "Stark, White and Abbott", "Cloned Optimal Architecture", "in-progress"],
      ["2", "Wiza LLC", "Exclusive Bandwidth-Monitored Implementation", "complete"],
      ["3", "Nolan LLC", "Vision-Oriented 4th Generation GUI", "backlog"],
      ["4", "Thompson PLC", "Streamlined Regional Knowledge User", "in-progress"],
      ["5", "Walker-Williamson", "Team-Oriented Matrix", "in-progress"],
      ["6", "Boehm and Sons", "Automated Systematic Paradigm", "backlog"],
      ["7", "Runolfsson, Hegmann and Block", "Integrated Transitional Strategy", "backlog"],
      ["8", "Schumm-Labadie", "Operative Heuristic Challenge", "backlog"],
      ["9", "Kohler Group", "Re-Contextualized Multi-Tasking", "backlog"],
      ["10", "Romaguera Inc", "Managed Foreground Toolset", "backlog"],
      ["11", "Reilly-King", "Future-Proofed Interactive Toolset", "complete"],
      ["12", "Emard, Champlin and Runolfsdottir", "Devolved Capability", "backlog"],
      ["13", "Fritsch, Cronin and Wolff", "Open-Source Website", "complete"],
      ["14", "Borer LLC", "Profit-Focused Orchestration", "backlog"],
      ["15", "Emmerich-Ankunding", "User-Centric Stable Extranet", "in-progress"],
      ["16", "Willms-Abbott", "Progressive Access", "in-progress"],
      ["17", "Brekke PLC", "Intuitive User-Facing System", "complete"],
      ["18", "Bins, Toy and Klocko", "Integrated Software", "backlog"],
      ["19", "Hodkiewicz-Hayes", "Programmable Secured Line", "backlog"],
      ["20", "Murphy, Lang and Ferry", "Organized Explicit Access", "backlog"],
    ].map(([id, name, description, status]) => ({
      id,
      name,
      description,
      status,
    }));
  }

  renderSwimlane(title, clients, ref) {
    return <Swimlane name={title} clients={clients} dragulaRef={ref} />;
  }

  render() {
    return (
      <div className="Board container-fluid">
        <div className="row">
          <div className="col-md-4">
            {this.renderSwimlane(
              "Backlog",
              this.state.clients.backlog,
              this.swimlanes.backlog
            )}
          </div>

          <div className="col-md-4">
            {this.renderSwimlane(
              "In Progress",
              this.state.clients.inProgress,
              this.swimlanes.inProgress
            )}
          </div>

          <div className="col-md-4">
            {this.renderSwimlane(
              "Complete",
              this.state.clients.complete,
              this.swimlanes.complete
            )}
          </div>
        </div>
      </div>
    );
  }
}
