import { Component } from '@angular/core';
import { A5DeviceManager, A5Device } from 'activ5-device';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public device: A5Device;
  public buffer: string[] = ['test'];
  public isStreaming: boolean = false;
  
  private manager = new A5DeviceManager();

  public connect(): void {
    this.manager.connect().then((newDevice: A5Device) => {
      const name = newDevice.device.name;

      if (this.device) {
        this.device = undefined;
      }

      this.device = newDevice;
      this.device.getIsometricData().subscribe((data: string) => {
        this.buffer.push(data);
        console.log(data);
      });

      this.device.onDisconnect().subscribe((event: Event) => {
        this.device = undefined;
      });
    });
  }

  public startStreaming(): void {
    this.device.startIsometric();
    this.isStreaming = true;
  }

  public tare(): void {
    this.device.tare();
  }

  public stopStreaming(): void {
    this.device.stop();
    this.isStreaming = false;
  }

  public stayOn(isStayOn: boolean): void {
    this.device.evergreenMode(isStayOn);
  }

  public disconnect(): void {
    this.device.disconnect();
    this.isStreaming = false;
  }

  title = 'activ5-app';

}
