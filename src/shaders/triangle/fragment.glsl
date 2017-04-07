uniform float frame;
uniform sampler2D tDiffuse;
uniform vec2 resolution;

varying vec2 vUv;
varying vec2 aUv;

#define EPS 0.01
#define FAR 10.0
#define STEPS 64

float map(vec3 p) {
    float v = frame / 60.;
    float r = 1.35 + 0.35*cos(8.3*p.y + v) + 0.35*cos(2.3*p.x + v);
    return length(p) - r;
}

vec3 shade(vec3 ro, vec3 rd, float t) {
    return vec3(1.0);
}

void main() {
    vec2 uv = -1.0 + 2.0 * vUv;
    uv.x *= 16.0/9.0;
    vec3 ro = vec3(0.0, 0.0, 2.5);
    vec3 rd = normalize(vec3(uv, -1.0));

    float t = 0.0;
    float d = EPS;

    for(int i = 0; i < STEPS; ++i) {
        d = map(ro + t*rd);
        if(d < EPS || t > FAR) break;
        t += d;
    }

    vec3 c = d < EPS ? shade(ro, rd, t) : mix(vec3(0.0),
                                              vec3(0.2, 0.3, 0.8),
                                              2.0 - length(uv));

    gl_FragColor = vec4(c, 1.0);
}
