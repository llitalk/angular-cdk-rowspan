import { Component, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {CdkTableModule} from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { CdkOverlayOrigin, OverlayModule } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  template: `
  <table cdk-table [dataSource]="dataSource">
  <!-- Column Definitions -->
  <ng-container cdkColumnDef="name">
    <th cdk-header-cell *cdkHeaderCellDef> שם </th>
    <td cdk-cell *cdkCellDef="let element"> {{ element.name }} </td>
  </ng-container>

  <ng-container cdkColumnDef="valcurrentYear">
    <th cdk-header-cell *cdkHeaderCellDef> {{ data.headline.currentYear }} </th>
    <td cdk-cell *cdkCellDef="let element"> {{ element.valcurrentYear }} </td>
  </ng-container>

  <ng-container cdkColumnDef="valueprewYear">
    <th cdk-header-cell *cdkHeaderCellDef> {{ data.headline.prewYear }} </th>
    <td cdk-cell *cdkCellDef="let element"> {{ element.valueprewYear }} </td>
  </ng-container>

  <ng-container cdkColumnDef="valbefore">
    <th cdk-header-cell *cdkHeaderCellDef> {{ data.headline.before }} </th>
    <td cdk-cell *cdkCellDef="let element"> {{ element.valbefore }} </td>
  </ng-container>

  <ng-container cdkColumnDef="section">
    <td cdk-cell *cdkCellDef="let row" [attr.colspan]="displayedColumns.length" class="section-title">
      {{ getSectionTitle(row.gridNumber) }}
    </td>
  </ng-container>

  <!-- Header Row -->
  <tr cdk-header-row *cdkHeaderRowDef="displayedColumns"></tr>

  <!-- Section Row -->
  <tr cdk-row *cdkRowDef="let row; columns: ['section']; when: isSectionRow"></tr>

  <!-- Data Row -->
  <tr cdk-row *cdkRowDef="let row; columns: displayedColumns; when: isDataRow"></tr>
</table>

  `,
  styles: `
  .section-title {
    font-weight: bold;
    background: #f0f0f0;
    text-align: start;
  }
  
  .hidden {
    display: none;
  }
  
  .section-row {
    background: #e0e0e0;
  }
  `,
  imports:[CdkTableModule, CommonModule, TranslocoModule, OverlayModule]
})
export class App implements OnInit{

  data = {
    headline: { currentYear: '2020', prewYear: '2019', before: '2018' },
    financials: [
      { name: 'מאזן', valcurrentYear: 444, valueprewYear: 4343, valbefore: 4343434, gridNumber: 1 },
      { name: 'סה״כ נכסים', valcurrentYear: 66777, valueprewYear: 43888, valbefore: 3333, gridNumber: 1 },
      { name: 'נכסים שוטפים', valcurrentYear: 323232, valueprewYear: 111000, valbefore: 99999, gridNumber: 2 },
      { name: 'נכסים בלתי שוטפים', valcurrentYear: 323232, valueprewYear: 111000, valbefore: 99999, gridNumber: 3 }
    ]
  };

  displayedColumns: string[] = ['name', 'valcurrentYear', 'valueprewYear', 'valbefore'];
  dataSource: any[] = [];

  ngOnInit() {
    const grouped = this.data.financials.reduce((acc, item) => {
      const group = item.gridNumber;
      if (!acc[group]) acc[group] = [];
      acc[group].push(item);
      return acc;
    }, {} as { [key: number]: any[] });

    this.dataSource = Object.entries(grouped).flatMap(([grid, items]) => [
      { isSection: true, gridNumber: +grid },
      ...items,
    ]);
  }

  isSectionRow = (index: number, row: any) => row.isSection === true;
isDataRow = (index: number, row: any) => !row.isSection;

  getSectionTitle(gridNumber: number): string {
    const titles: { [key: number]: string } = {
      1: 'Grid 1 Title',
      2: 'Grid 2 Title',
      3: 'Grid 3 Title',
      4: 'Grid 4 Title',
    };
    return titles[gridNumber] || `Grid ${gridNumber}`;
  }
}

  


bootstrapApplication(App);
