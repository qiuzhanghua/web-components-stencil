// custom-button.ts
import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'custom-button',
  styleUrl: 'custom-button.css',
  shadow: true
})
export class CustomButton {
  render() {
    return (
      <Host role="presentation">
        <button id="custom" part="main"><slot /></button>
      </Host>
    )
  }
}
