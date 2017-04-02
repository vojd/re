(function(global) {
  class RotozoomShaderNode extends NIN.ShaderNode {
    constructor(id, options) {
      options.inputs = {
        texture: new NIN.TextureInput(),
      };
      super(id, options);

      this.startTime = FRAME_FOR_BEAN(12 * 4 * 75);
      this.amountStartTime = FRAME_FOR_BEAN(12 * 4 * 75.5);
      this.uniforms.translate.value = new THREE.Vector2();
    }

    update(frame) {
      const amount = smoothstep(
        0,
        1,
        (frame - this.amountStartTime) / (this.amountStartTime - this.startTime) / 8);


      if(BEAN >= 12 * 4 * 78.5) {
        if(BEAN < 12 * 4 * 78.5 + 3) {
          frame = this.amountStartTime;
        } else if(BEAN < 12 * 4 * 78.5 + 9){
          frame = this.amountStartTime + 10;
        } else if(BEAN < 12 * 4 * 78.5 + 9 + 3){
          frame = this.amountStartTime + 20;
        } else if(BEAN < 12 * 4 * 78.5 + 9 + 6){
          frame = this.amountStartTime + 30;
        } else if(BEAN < 12 * 4 * 78.5 + 9 + 6 + 1.5){
          frame = this.amountStartTime + 40;
        } else if(BEAN < 12 * 4 * 78.5 + 9 + 9){
          frame = this.amountStartTime + 50;
        } else if(BEAN < 12 * 4 * 78.5 + 9 + 9 + 3){
          frame = this.amountStartTime + 60;
        } else if(BEAN < 12 * 4 * 78.5 + 9 + 9 + 6){
          frame = this.amountStartTime + 70;
        }
      }

      this.uniforms.angle.value = (frame - this.amountStartTime) * 0.01 * amount;
      this.uniforms.zoom.value = 0.5 + amount * (frame - this.amountStartTime) * 0.01;
      this.uniforms.translate.value.x = 1. + amount * (0.5 + 2. * Math.sin(frame * 0.02));
      this.uniforms.translate.value.y = 1. + amount * (2. * Math.cos(frame * 0.02));
      this.uniforms.frame.value = frame;
      this.uniforms.tDiffuse.value = this.inputs.texture.getValue();

      if(BEAN >= 12 * 4 * 76.75) {
        if(BEAN < 12 * 4 * 76.75 + 3) {
          this.uniforms.zoom.value += 1;  
        } else if(BEAN < 12 * 4 * 76.75 + 6) {
          this.uniforms.zoom.value += 2;
        } else if(BEAN < 12 * 4 * 76.75 + 9) {
          this.uniforms.zoom.value += 3;
        } else {
          this.uniforms.zoom.value += smoothstep(4, -1, (frame - 8530) / 65);
        }
      }
    }
  }

  global.RotozoomShaderNode = RotozoomShaderNode;
})(this);
