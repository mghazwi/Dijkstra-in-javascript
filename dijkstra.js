//Implementation of Dijkstra algorithm on javascript

//initialize the Graph
const graph = {
  a: {b: 7, c: 9, f:14},
  b: {c: 10, d: 15},
  c: {d: 11, f: 2},
  d: {e: 6 },
  e: {f: 9},
  f: {}
};

//start and end
const start = 'a';
const end = 'e';

// vertex class
class Vertex{
  //construct the vertex given name of the vertex
  constructor(name){
    this.name = name;
  }

  //get the edges for the vertex (returns object of vertex names and values)
  get edges(){
    return this._edges;
  }
  //set the edges for the vertex
  set edges(edges){
    this._edges = edges;
  }

}

//visited object stores names of visited vertcies
let visited = {};
// create dist and prev objects to record distance and track path
let dist = {};
let prev = {};

//assign infinity to all distances
for(let key in graph){
  dist[key] = Infinity;
}

//distance of start is zero
dist[start] = 0;

//run dijkstra algorithm
function dijkstra(){
  try{
    let u = getMinDist(); // get minimum distance vertex
    while(u){
      visited[u.name] = {}; //add the vertex name to visited
      for(let edge in u.edges){ //loop over all neighbours
        let alt = dist[u.name] + u.edges[edge];
        if(alt < dist[edge]){
          dist[edge] = alt;
          prev[edge] = u.name;
        }
      }
      u = getMinDist();
    }
  }catch(err){
    console.log(err);
  }
}


// function to find minimum distance in graph and return vertex object
// otherwise return undefined
function getMinDist(){
  try{
    let min = Infinity;
    let minKey;
    //loop over all keys (vertcies) in dist
    for(let key in dist){
      if(visited[key] === undefined && dist[key] < min){ //only check unvisited vertcies
        min = dist[key];
        minKey = key;
      }
    }
    //return undefined if minKey has not been defined
    if(minKey === undefined){
      return undefined;
    }
    //create vertex for minimum vertex
    let minVertex = new Vertex(minKey);
    minVertex.edges = graph[minKey]; // assign the edges
    return minVertex;
  }catch(err){
    console.log(err);
  }
}


// print the shortest dist route
function printRoute(){
  try{
    let path = [];
    let v = end;
    while(v){
      path.push(v);
      v = prev[v];
    }
    path.reverse();
    let print = "Start -> ";
    let distance = "(start) -> (";
    for(let p of path){
      print += p;
      print += " -> ";
      distance += dist[p];
      distance += ") -> (";
    }
    print += "End";
    distance += "end)";
    console.log(print);
    //print distance
    console.log(distance);
  }catch(err){
    console.log(err);
  }
}

//run the functions:
console.log("start");
dijkstra(); //start the algorithm
printRoute(); //print path
