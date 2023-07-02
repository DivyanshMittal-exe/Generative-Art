//  // Define the size of the 2D array
//  const numRows = 200; // Number of rows
//  const numCols = 1000; // Number of columns

//  // Create a new WebGPU device and context
//  async function initWebGPU() {
//    const adapter = await navigator.gpu.requestAdapter();
//    const device = await adapter.requestDevice();
//    const canvas = document.getElementById('canvas');
//    const context = canvas.getContext('webgpu');

//    const presentationFormat = context.getPreferredFormat(adapter);

//    context.configure({
//      device: device,
//      format: presentationFormat,
//    });

//    return context;
//  }

//  // Create a shader module to display the intensity values
//  function createShaderModule(device) {
//    const shaderCode = `
//      [[stage(vertex)]]
//      fn vs_main([[builtin(vertex_index)]] vertexIndex: u32) -> [[builtin(position)]] vec4<f32> {
//        var pos: array<vec2<f32>, 6> = array<vec2<f32>, 6>(
//          vec2<f32>(-1.0, 1.0), vec2<f32>(1.0, 1.0), vec2<f32>(-1.0, -1.0),
//          vec2<f32>(-1.0, -1.0), vec2<f32>(1.0, 1.0), vec2<f32>(1.0, -1.0)
//        );
//        return vec4<f32>(pos[vertexIndex], 0.0, 1.0);
//      }

//      [[stage(fragment)]]
//      fn fs_main() -> [[location(0)]] vec4<f32> {
//        return vec4<f32>(1.0, 1.0, 1.0, 1.0); // Display white
//      }
//    `;

//    const shaderModule = device.createShaderModule({
//      code: shaderCode,
//    });

//    return shaderModule;
//  }

//  // Generate a 2D array of random float values between 0 and 1
//  function generateFloatArray() {
//    const floatArray = [];

//    for (let i = 0; i < numRows; i++) {
//      const row = [];

//      for (let j = 0; j < numCols; j++) {
//        const floatValue = Math.random();
//        row.push(floatValue);
//      }

//      floatArray.push(row);
//    }

//    return floatArray;
//  }

//  // Create the WebGPU render pass to display the intensity values
//  function createRenderPass(context, shaderModule, floatArray) {
//    const pipeline = context.createRenderPipeline({
//      vertex: {
//        module: shaderModule,
//        entryPoint: 'vs_main',
//      },
//      fragment: {
//        module: shaderModule,
//        entryPoint: 'fs_main',
//        targets: [{
//          format: 'bgra8unorm',
//        }],
//      },
//    });

//    const commandEncoder = context.createCommandEncoder();
//    const texture = context.getCurrentTexture();

//    const renderPass = commandEncoder.beginRenderPass({
//      colorAttachments: [{
//        view: texture.createView(),
//        loadValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
//        storeOp: 'store',
//      }],
//    });

//    for (let i = 0; i < numRows; i++) {
//      for (let j = 0; j < numCols; j++) {
//        const intensity = floatArray[i][j];
//        const rectWidth = canvas.width / numCols;
//        const rectHeight = canvas.height / numRows;

//        renderPass.setPipeline(pipeline);
//        renderPass.setScissorRect(0, 0, rectWidth, rectHeight);
//        renderPass.draw(6, 1, 0, 0);
//      }
//    }

//    renderPass.endPass();
//    context.queue.submit([commandEncoder.finish()]);
//  }

//  // Initialize WebGPU and display the float array
//  async function init() {
//    const context = await initWebGPU();
//    const shaderModule = createShaderModule(context.getDevice());
//    const floatArray = generateFloatArray();
//    createRenderPass(context, shaderModule, floatArray);
//  }

//  // Call the init function when the page finishes loading
//  window.addEventListener('load', init);

window.onresize = function(){ location.reload(); }


if (!navigator.gpu) {
    throw new Error("WebGPU not supported on this browser.");
  }

const adapter = await navigator.gpu.requestAdapter();
if (!adapter) {
  throw new Error("No appropriate GPUAdapter found.");
}

const device = await adapter.requestDevice();



const canvas2 = document.getElementById('canvas');

    
const parentWidth = canvas2.parentNode.clientWidth;
const parentHeight = canvas2.parentNode.clientHeight;

    // Calculate the new width and height
let newWidth = parentWidth;
let newHeight = parentHeight;


newWidth = Math.ceil(newWidth/64)*64;
newHeight = Math.ceil(newHeight/64)*64;



// Set the canvas size
// canvas2.style.width = '100%';
// canvas2.style.height = '100%';
canvas2.style.width = newWidth;
canvas2.style.height = newHeight;

    // Redraw the canvas content if needed
    // ...

console.log('Canvas size adjusted:', canvas2.width, canvas2.height);



const aspectRatio = 1; // Set the desired aspect ratio here

console.log(canvas.offsetWidth);
// canvas.offsetWidth = 640;
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetWidth / aspectRatio;





const context = canvas.getContext("webgpu");
const canvasFormat = navigator.gpu.getPreferredCanvasFormat();
context.configure({
  device: device,
  format: canvasFormat,
});







const vertices = new Float32Array([
    //   X,    Y,
      -1, -1, // Triangle 1 (Blue)
       1, -1,
       1,  1,
    
      -1, -1, // Triangle 2 (Red)
       1,  1,
      -1,  1,
    ]);

const vertexBuffer = device.createBuffer({
    label: "Cell vertices",
    size: vertices.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    });

device.queue.writeBuffer(vertexBuffer, /*bufferOffset=*/0, vertices);


const vertexBufferLayout = {
    arrayStride: 8,
    attributes: [{
      format: "float32x2",
      offset: 0,
      shaderLocation: 0, // Position, see vertex shader
    }],
  };


let ROWS = Math.ceil(canvas2.offsetHeight/2) ;
let COLS = Math.ceil(canvas2.offsetWidth/2);

console.log(ROWS);
console.log(COLS);

const WORKGROUP_ROWS = 16;
const WORKGROUP_COLS = 16;

// Create a uniform buffer that describes the grid.
const uniformArray = new Float32Array([COLS, ROWS]);


const uniformBuffer = device.createBuffer({
label: "Grid Uniforms",
size: uniformArray.byteLength,
usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
});


// Create an array representing the active state of each cell.
const cellStateArray = new Float32Array(ROWS * COLS);

// Create two storage buffers to hold the cell state.
const cellStateStorage = [
  device.createBuffer({
    label: "Cell State A",
    size: cellStateArray.byteLength,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
  }),
  device.createBuffer({
    label: "Cell State B",
     size: cellStateArray.byteLength,
     usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
  })
];

// Set each cell to a random state, then copy the JavaScript array 
// into the storage buffer.

// for(let i = 0; i < ROWS; i++){
//   for(let j = 0; j < COLS; j++){
//     let v = i*COLS + j; 
//     cellStateArray[v] = Math.random();
//   }
// }

for(let i = 0; i < ROWS/3; i++){
  for(let j = 0; j < COLS/3; j++){
    

    let v = (ROWS/3 + i) * COLS + (j + COLS/3); 

    v = Math.floor(v);

    cellStateArray[v] = Math.random();
  }
}

// for(let i = 0; i < ROWS/2; i++){
//   for(let j = 0; j < COLS/2; j++){
//     let v = i*COLS + j; 
//     cellStateArray[v] = 1;
//   }
// }

// for (let i = 0; i < cellStateArray.length; ++i) {
//   cellStateArray[i] = Math.random() > 0.6 ? 1:0;
// } 
device.queue.writeBuffer(cellStateStorage[0], 0, cellStateArray);

// for(let i = 0; i < ROWS; i++){
//   for(let j = 0; j < COLS; j++){
//     let v = i*COLS + j; 
//     cellStateArray[v] = Math.random();
//   }
// }

for(let i = 0; i < ROWS/2; i++){
  for(let j = 0; j < COLS/2; j++){
    

    let v = (3*ROWS/4 + i) * COLS + (j + 3*COLS/4); 

    v = Math.floor(v);

    cellStateArray[v] = 1;
  }
}

// for (let i = 0; i < cellStateArray.length; ++i) {
//   cellStateArray[i] = Math.random() > 0.6 ? 1:0;
// } 
device.queue.writeBuffer(cellStateStorage[1], 0, cellStateArray);


device.queue.writeBuffer(uniformBuffer, 0, uniformArray);

  const cellShaderModule = device.createShaderModule({
    label: 'Cell shader',
    code: `
    
    struct VertexInput {
      @location(0) pos: vec2f,
      @builtin(instance_index) instance: u32,
    };
    
    struct VertexOutput {
      @builtin(position) pos: vec4f,
      @location(0) cell: vec2f, // New line!
      @location(1) alphaValue: f32,
    };
    
    @group(0) @binding(0) var<uniform> grid: vec2f;
    @group(0) @binding(1) var<storage> cellState: array<f32>; // New!
    
    @vertex
    fn vertexMain(@location(0) pos: vec2f,
                  @builtin(instance_index) instance: u32) -> VertexOutput {
      let i = f32(instance);
      let cell = vec2f(i % grid.x, floor(i / grid.x));
      // let state = f32(cellState[instance]); // New line!

      var state:f32 = 0;
      if(f32(cellState[instance]) > 0.5){
        state = 1;
      }

      // let state:f32 = 1;
    
      let cellOffset = cell / grid * 2;
      // New: Scale the position by the cell's active state.
      let gridPos = (pos*state+1) / grid - 1 + cellOffset;
    
      var output: VertexOutput;
      output.pos = vec4f(gridPos, 0, 1);
      output.cell = cell;
      output.alphaValue = cellState[instance];
      return output;

    }

  
    @fragment
    fn fragmentMain(input: VertexOutput) -> @location(0) vec4f {
      let c = input.cell / grid;
      return vec4f(input.alphaValue*c, input.alphaValue*(1-c.x), 0);
    }
    `
  });


  // Create the compute shader that will process the simulation.
  const simulationShaderModule = device.createShaderModule({
    label: "Life simulation shader",
    code: `
      @group(0) @binding(0) var<uniform> grid: vec2f;
  
      @group(0) @binding(1) var<storage> cellStateIn: array<f32>;
      @group(0) @binding(2) var<storage, read_write> cellStateOut: array<f32>;

      const alpha:f32 = 0.028;
      const b1:f32 = 0.278;
      const b2:f32 = 0.365;
      const d1:f32 = 0.267;
      const d2:f32 = 0.445;
      const dt:f32 = 0.1;


      fn sigmaOne(x:f32,a:f32) -> f32{
            return 1.0/(1.0 + exp(-1*(x-a)*4/alpha));
      }

      fn sigmaTwo(x:f32,a:f32,b:f32) -> f32{
        return sigmaOne(x,a)*(1-sigmaOne(x,b));
      }

      fn sigmaM(x:f32,y:f32,m:f32) -> f32{
        return x*(1-sigmaOne(m,0.5)) + y*(sigmaOne(m,0.5));
      }

      fn s(n:f32,m:f32) -> f32{
        return sigmaTwo(n , sigmaM(b1,d1,m), sigmaM(b2,d2,m));
      }
  
      fn cellIndex(cell: vec2i) -> i32 {
        return (((cell.y % i32(grid.y))   +  i32(grid.y)) % i32(grid.y)  ) * i32(grid.x) + 
              (((( cell.x % i32(grid.x) ) +  i32(grid.x))) % i32(grid.x)) ;
      }
  
      fn cellActive(x: i32, y: i32) -> f32 {
        return cellStateIn[cellIndex(vec2(x, y))];
      }
  
      @compute @workgroup_size(${WORKGROUP_ROWS}, ${WORKGROUP_COLS})
      fn computeMain(@builtin(global_invocation_id) cell: vec3u) {  

        // if(global_invocation_id >= (${ROWS})*(${COLS})){
        //   return;
        // }
        let ri:i32 = 7;
        let ra:i32 = 3*ri;

        var innerNeighbours:f32 = 0.0;
        var outerNeighbours:f32 = 0.0;

        var innerTot:f32 = 0.0;
        var outerTot:f32 = 0.0;

        for(var dy:i32 = -1*(ra - 1); dy <= (ra - 1); dy++){
          for(var dx:i32 = -1*(ra - 1); dx <= (ra - 1); dx++){
            
            if(dx*dx + dy*dy <= ri*ri){
              innerNeighbours += cellActive(i32(cell.x) + dx, i32(cell.y)+dy);
              innerTot += 1.0;
            }else if(dx*dx + dy*dy <= ra*ra){
              outerNeighbours += cellActive(i32(cell.x) + dx, i32(cell.y)+dy);
              outerTot += 1.0;
            }
          }
        }
        
        innerNeighbours /= innerTot;
        outerNeighbours /= outerTot;

        let i = cellIndex(vec2i(cell.xy));

        cellStateOut[i] = cellStateIn[i] + dt*(2*s(outerNeighbours,innerNeighbours) - 1);


        if(cellStateOut[i] > 1){
          cellStateOut[i] = 1;
        }else if(cellStateOut[i] < 0){
          cellStateOut[i] = 0;
        }

      }
    `
  });


// Create the bind group layout and pipeline layout.
const bindGroupLayout = device.createBindGroupLayout({
  label: "Cell Bind Group Layout",
  entries: [{
    binding: 0,
    visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT |GPUShaderStage.COMPUTE,
    buffer: {} // Grid uniform buffer
  }, {
    binding: 1,
    visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT |GPUShaderStage.COMPUTE,
    buffer: { type: "read-only-storage"} // Cell state input buffer
  }, {
    binding: 2,
    visibility: GPUShaderStage.FRAGMENT |GPUShaderStage.COMPUTE,
    buffer: { type: "storage"} // Cell state output buffer
  }]
});


// Create a bind group to pass the grid uniforms into the pipeline
const bindGroups = [
  device.createBindGroup({
    label: "Cell renderer bind group A",
    layout: bindGroupLayout, // Updated Line
    entries: [{
      binding: 0,
      resource: { buffer: uniformBuffer }
    }, {
      binding: 1,
      resource: { buffer: cellStateStorage[0] }
    }, {
      binding: 2, // New Entry
      resource: { buffer: cellStateStorage[1] }
    }],
  }),
  device.createBindGroup({
    label: "Cell renderer bind group B",
    layout: bindGroupLayout, // Updated Line

    entries: [{
      binding: 0,
      resource: { buffer: uniformBuffer }
    }, {
      binding: 1,
      resource: { buffer: cellStateStorage[1] }
    }, {
      binding: 2, // New Entry
      resource: { buffer: cellStateStorage[0] }
    }],
  }),
];


const pipelineLayout = device.createPipelineLayout({
  label: "Cell Pipeline Layout",
  bindGroupLayouts: [ bindGroupLayout ],
});

const cellPipeline = device.createRenderPipeline({
  label: "Cell pipeline",
  layout: pipelineLayout, // Updated!
  vertex: {
    module: cellShaderModule,
    entryPoint: "vertexMain",
    buffers: [vertexBufferLayout]
  },
  fragment: {
    module: cellShaderModule,
    entryPoint: "fragmentMain",
    targets: [{
      format: canvasFormat
    }]
  }
});

// Create a compute pipeline that updates the game state.
const simulationPipeline = device.createComputePipeline({
  label: "Simulation pipeline",
  layout: pipelineLayout,
  compute: {
    module: simulationShaderModule,
    entryPoint: "computeMain",
  }
});


const UPDATE_INTERVAL = 100; // Update every 200ms (5 times/sec)
let step = 0; // Track how many simulation steps have been run


// async function logCellStateStorageValues() {
//   for (let i = 0; i < cellStateStorage.length; i++) {
//     const value = await cellStateStorage[i].read();
//     console.log(`Value at index ${i}:`, value);
//   }
// }

// // Call the async function to log the values
// logCellStateStorageValues();


function updateGrid() {

  const encoder = device.createCommandEncoder();

  const computePass = encoder.beginComputePass();

  computePass.setPipeline(simulationPipeline),
  computePass.setBindGroup(0, bindGroups[step % 2]);


// New lines
  const workgroupCount_rows = Math.ceil(ROWS / WORKGROUP_ROWS);
  const workgroupCount_cols = Math.ceil(COLS / WORKGROUP_COLS);
  computePass.dispatchWorkgroups(workgroupCount_rows, workgroupCount_cols);

  computePass.end();

  // logCellStateStorageValues();

  step++; // Increment the step count
  
  // Start a render pass 
  const pass = encoder.beginRenderPass({
    colorAttachments: [{
      view: context.getCurrentTexture().createView(),
      loadOp: "clear",
      clearValue: { r: 0, g: 0, b: 0.4, a: 1.0 },
      storeOp: "store",
    }]
  });

  

  // Draw the grid.
  pass.setPipeline(cellPipeline);
  pass.setBindGroup(0, bindGroups[step % 2]); // Updated!
  pass.setVertexBuffer(0, vertexBuffer);
  pass.draw(vertices.length / 2, ROWS * COLS);

  // End the render pass and submit the command buffer
  pass.end();
  device.queue.submit([encoder.finish()]);
}

// Schedule updateGrid() to run repeatedly
setInterval(updateGrid, UPDATE_INTERVAL);


