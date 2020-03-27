import { Component } from '@angular/core';
import { A5DeviceManager, A5Device } from 'activ5-device';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public device: A5Device;
  public csvService: CsvDataService; 
  public buffer: object[] = [];
  public timeStamp: number[] = [];
  public isStreaming: boolean = false;
  private seconds: number = 0;
  private counter;
  
  private manager = new A5DeviceManager();

  public connect(): void {
    this.manager.connect().then((newDevice: A5Device) => {
      const name = newDevice.device.name;

      if (this.device) {
        this.device = undefined;
      }

      this.device = newDevice;

      this.device.getIsometricData().subscribe((data: string) => {
        this.buffer.push({'Time (s)': new Date().getTime(), 'Force (N)': data});
      });

      this.device.onDisconnect().subscribe((event: Event) => {
        this.device = undefined;
      });
    });
  }

  public startStreaming(): void {
    this.device.startIsometric();
    this.counter = setInterval(() => {
      this.seconds++;}, 1000);
    this.isStreaming = true;
  }

  public tare(): void {
    this.device.tare();
  }

  public stopStreaming(): void {
    clearInterval(this.counter);
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

  public clear(): void {
    this.buffer = [];
    clearInterval(this.counter);
    this.seconds = 0;
  }

  public download(): void {
    var today = new Date().toISOString()
    CsvDataService.exportToCsv("Activ5Force_" + today + ".csv", this.buffer)
  }

  public hms(): string {
    var h = Math.floor(this.seconds / 3600);
    var m = Math.floor(this.seconds % 3600 / 60);
    var s = Math.floor(this.seconds % 3600 % 60);

    var hDisplay = h > 0 ? h + ":" : "";
    var mDisplay: string;
    if (m>9) {mDisplay = m + ":"}
    else if (m>0) {mDisplay = "0" + m + ":"}
    else {mDisplay = "00:"}
    var sDisplay = s > 9 ? s : "0" + s;
    return hDisplay + mDisplay + sDisplay; 
}

  title = 'activ5-app';

}

export class CsvDataService {
  static exportToCsv(filename: string, rows: object[]) {
    if (!rows || !rows.length) {
      return;
    }
    const separator = ',';
    const keys = Object.keys(rows[0]);
    const csvContent =
      keys.join(separator) +
      '\n' +
      rows.map(row => {
        return keys.map(k => {
          let cell = row[k] === null || row[k] === undefined ? '' : row[k];
          cell = cell instanceof Date
            ? cell.toLocaleString()
            : cell.toString().replace(/"/g, '""');
          if (cell.search(/("|,|\n)/g) >= 0) {
            cell = `"${cell}"`;
          }
          return cell;
        }).join(separator);
      }).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, filename);
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) {
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }
}