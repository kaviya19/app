import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewAchievementPage } from './view-achievement.page';

describe('ViewAchievementPage', () => {
  let component: ViewAchievementPage;
  let fixture: ComponentFixture<ViewAchievementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAchievementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewAchievementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
