import * as THREE from 'https://esm.sh/three@0.152.2';

export function createOutline(mesh, scene, options = {}) {
  const { color = 0xffffff, linewidth = 4, scale = 1.015 } = options;
  if (!mesh || !mesh.geometry) return null;

  const edges = new THREE.EdgesGeometry(mesh.geometry);
  const mat = new THREE.LineBasicMaterial({
    color: color,
    linewidth: linewidth,
    transparent: true,
    opacity: 0
  });

  const outline = new THREE.LineSegments(edges, mat);
  outline.scale.set(
    (mesh.scale.x || 1) * scale,
    (mesh.scale.y || 1) * scale,
    (mesh.scale.z || 1) * scale
  );
  outline.position.copy(mesh.position);
  outline.rotation.copy(mesh.rotation);

  scene.add(outline);
  mesh.userData = mesh.userData || {};
  mesh.userData.outline = outline;
  return outline;
}

export function setHoverOutline(mesh) {
  if (!mesh || !mesh.userData || !mesh.userData.outline) return;
  const outline = mesh.userData.outline;
  outline.material.color.setHex(0xffffff);
  outline.material.opacity = 1;
}

export function resetHoverOutline(mesh) {
  if (!mesh || !mesh.userData || !mesh.userData.outline) return;
  const outline = mesh.userData.outline;
  outline.material.opacity = 0;
}
